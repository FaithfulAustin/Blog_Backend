import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail } from "class-validator";

export class EmailDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
    @IsEmail()
    public email!: string;
}
export class PasswordDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Trim()
    public email!: string;

    @IsNotEmpty()
    public password!: string;
}