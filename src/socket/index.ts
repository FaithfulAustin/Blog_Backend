import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketServer, Socket } from "socket.io"
import Jwt from "../utils/jwt";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import SocketUserGuard from "../guard/socket-user.guard";
import { ExtendedError } from "socket.io/dist/namespace";


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

    io.on('connection', (socket) => {
        const customSocket = socket as CustomSocket;
        console.log('User connected:', customSocket.user);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        socket.on('post', async (postId: string, content: string) => {
            setTimeout(() => {
                socket.emit('post', { message: 'Note saved successfully', content: "hi" });
            }, 3000);

        });
    });
}
