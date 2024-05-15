import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";

export class emailDto {
    public email!: string;
}
export class PasswordDto {

    public email!: string;
    public password!: string;
}