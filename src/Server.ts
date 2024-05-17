import express,{NextFunction, Request,Response} from "express"
import { Route } from "./api/Interface/route.interface";
import { connectDB } from ".";
import authRouter from "./api/route/AuthRoute";
import categoryRouter from "./api/route/CategoryRoute";
import UserRoute from "./api/route/UserRoute";

const port = 3000;

export class Server {
  
    private app = express();

    startServer() {

        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(express.json())
        this.app.use('/auth', authRouter)
        this.app.use('/user',UserRoute)
        this.app.use('/Category', categoryRouter)

        
        //this prints the error in the console, rather than in the response!
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack)
            res.send(err.message)
            next();
        })

        this.app.listen(port, () => {
            this.DBconnection()
            console.log('Listening on port ' + port)
        })
    }
 



   private async DBconnection() {
        connectDB()
    }



  
}



new Server().startServer();