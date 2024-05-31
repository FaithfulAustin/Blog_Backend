import { IncomingMessage, Server, ServerResponse } from "http";
import socketServer, { Socket } from "socket.io"
import Jwt from "../utils/jwt";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


interface CustomSocket extends socketServer.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
    user: string;
}

export default async function createSocket(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    const io = new socketServer.Server(server, {
        cors: {
            origin: 'http://localhost:5174',
        },
    })

    io.use((socket, next) => {
        const customSocket = socket as CustomSocket;

        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        const { value } = Jwt.verifyJwt(token)
        customSocket.user = value as unknown as string;
        next();
    });

    io.on('connection', (socket) => {
        const customSocket = socket as CustomSocket;
        console.log('User connected:', customSocket.user);

        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
        socket.on('post', (post) => {
            // console.log(post);
        });
    });
}
