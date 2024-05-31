
import jwt , { JwtPayload }  from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config"

class Jwt {
    public static signJwt(value: string, expiresIn: string | number) {
        return jwt.sign({ value }, ACCESS_TOKEN as unknown as string, { expiresIn });
    }
    public static verifyJwt(value: string): JwtPayload  {
        return jwt.verify(value, ACCESS_TOKEN as unknown as string) as JwtPayload;
    }
}

export default Jwt