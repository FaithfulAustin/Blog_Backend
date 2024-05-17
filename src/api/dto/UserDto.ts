import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, IsArray } from "class-validator";

export class userDto {
    
    @IsNotEmpty()
    @IsString()
    first_name!: string;
    @IsNotEmpty()
    @IsString()
    last_name!: string;
    

}