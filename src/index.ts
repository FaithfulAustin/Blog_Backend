import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

export const {
  ACCESS_TOKEN,
  MONGODB_URI,

} = process.env;

export async function connectDB() {
  try {
    await connect(MONGODB_URI as string);
    console.info(`
                                          ╔═══════════════════════════╗
                                          ║   DATABASE CONNECTED      ║
                                          ╚═══════════════════════════╝`);
  } catch (err) {
    if (err instanceof Error) {
      console.error("an error occurred. \nRetrying connection", err)
      // connectDB()
    };
  }
}


// declare module "jsonwebtoken"{
//   interface JwtPayload {
//     value: string;
//   }
// }