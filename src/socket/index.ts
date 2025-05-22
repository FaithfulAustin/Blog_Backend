import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketServer, Socket } from "socket.io"
import Jwt from "../utils/jwt";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import SocketUserGuard from "../guard/socket-user.guard";
import { ExtendedError } from "socket.io/dist/namespace";
import PostService from "../services/post.service";


interface CustomSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
    user: string;
}

export default async function createSocket(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    const io = new SocketServer(server, {
        cors: {
            origin: 'http://localhost:5174',
        },
    })

    io.use(async (socket, next) => {
        const customSocket = socket as CustomSocket;

        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        const { value } = Jwt.verifyJwt(token)
        try {
            await SocketUserGuard.isExist(value)
        } catch (err) {
            next(err as ExtendedError)
        }
        customSocket.user = value as unknown as string;
        next();
    });

    io.on('connection', async (socket) => {
        const customSocket = socket as CustomSocket;
        console.log('User connected:', customSocket.user);

        socket.on('disconnect', async () => {
            console.log('User disconnected');
        });
        socket.on('post', async (postId: string, content: string) => {
            console.log(postId)
            console.log(content)
            const postService = new PostService()
            const isSaved = await postService.createPost(postId, customSocket.user, content)
            console.log("isSaved", isSaved)
            if (isSaved) socket.emit('post', { postId: isSaved.postId, message: 'Note saved successfully', content: "hi" });
        });
    });
}
