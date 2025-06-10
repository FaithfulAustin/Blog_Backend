import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, IsArray } from "class-validator";

export class categoryDto {
    
    @IsNotEmpty()
    @IsString()
    categoryName!: string
}
export class categoryArrayDto {
    
    @IsNotEmpty()
    @IsArray()
    categoriesId!: string[]
}