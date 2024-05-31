import express, { NextFunction, Request, Response } from "express"
import { Route } from "./Interface/route.interface";
import { connectDB } from ".";
import authRouter from "./route/AuthRoute";
import categoryRouter from "./route/CategoryRoute";
import UserRoute from "./route/UserRoute";
import ErrorMiddleWare from "./middleware/error.middleware";
import cors from "cors"
const port = 3000;

export class Server {

    private app = express();

    startServer() {
        this.app.use(cors<Request>());
        this.app.use(express.json())
        this.app.use('/auth', authRouter)
        this.app.use('/user', UserRoute)
        this.app.use('/Category', categoryRouter)


        //this prints the error in the console, rather than in the response!
        // this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        //     console.error(err.stack)
        //     res.send(err.message)
        //     next();
        // })

        this.initializeErrorHandling();
        this.initializeMiddlewares();

        this.app.listen(port, () => {
            this.DBconnection()
            console.log('Listening on port ' + port)
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



new Server().startServer();

