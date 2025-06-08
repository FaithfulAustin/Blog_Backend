import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import Jwt from "../utils/jwt";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import SocketUserGuard from "../guard/socket-user.guard";
import PostService from "../services/post.service";

interface CustomSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
    user: string;
}

export default async function createSocket(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    const io = new SocketServer(server, {
        cors: {
            origin: 'http://localhost:5174',
        },
    });

    // Middleware for JWT authentication
    io.use(async (socket, next) => {
        const customSocket = socket as CustomSocket;
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: Token not provided'));
        }

        try {
            const { value } = Jwt.verifyJwt(token);
            await SocketUserGuard.isExist(value);
            customSocket.user = value as unknown as string;
            next();
        } catch (err) {
            next(new Error(`Authentication error: ${(err as Error).message}`));
        }
    });

    io.on('connection', async (socket) => {
        const customSocket = socket as CustomSocket;
        console.log('User connected:', customSocket.user);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('post', async (postId: string, content: string) => {
            try {
                console.log('Post ID:', postId);
                console.log('Content:', content);

                const postService = new PostService();
                const isSaved = await postService.createPost(postId, customSocket.user, content);

                console.log("isSaved", isSaved);

                if (isSaved) {
                    socket.emit('post', {
                        postId: isSaved.postId,
                        message: 'Note saved successfully',
                        content: content,
                    });
                } else {
                    socket.emit('error', {
                        message: 'Failed to save post',
                    });
                }
            } catch (error) {
                console.error('Error while handling post event:', error);
                socket.emit('error', {
                    message: 'Internal server error while saving post',
                    error: (error as Error).message,
                });
            }
        });
    });
}
