import express, { NextFunction, Request, Response } from "express"
// import { Route } from "./interface/route.interface";
import { connectDB } from ".";
import authRouter from "./route/AuthRoute";
import categoryRouter from "./route/CategoryRoute";
import postRouter from "./route/PostRoute";
import UserRoute from "./route/UserRoute";
import ErrorMiddleWare from "./middleware/error.middleware";
import cors from "cors"
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import createSocket from "./socket";
import { PORT } from "./config";

export class App {

    private app = express();
    public port: string | number;
    private server: Server<typeof IncomingMessage, typeof ServerResponse>;

    constructor() {
        this.app = express();
        this.port = PORT || 3000;
        this.server = createServer(this.app)
        createSocket(this.server)
    }

    startServer() {
        this.app.use(cors<Request>());
        this.app.use(express.json())
        this.app.use('/auth', authRouter)
        this.app.use('/user', UserRoute)
        this.app.use('/Category', categoryRouter)
        this.app.use('/post', postRouter)


        //this prints the error in the console, rather than in the response!
        // this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        //     console.error(err.stack)
        //     res.send(err.message)
        //     next();
        // })

        this.initializeErrorHandling();
        this.initializeMiddlewares();

        this.server.listen(this.port, () => {
            this.DBconnection()
            console.log('Listening on port ' + this.port)
        })
    }


    private initializeErrorHandling() {
        this.app.use(ErrorMiddleWare.handleErrors);
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async DBconnection() { connectDB() }
}



new App().startServer();

