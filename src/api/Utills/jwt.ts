
import jwt , { JwtPayload }  from "jsonwebtoken";
import { ACCESS_TOKEN } from "../.."

class Jwt {
    public static signJwt(value: string, expiresIn: string | number) {
        return jwt.sign({ value }, ACCESS_TOKEN as unknown as string, { expiresIn });
    }
    public static verifyJwt(value: string): string | JwtPayload | any {
        return jwt.verify(value, ACCESS_TOKEN as unknown as string)
    }
}

export default Jwt