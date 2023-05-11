import { IsEmail,IsLowercase,IsPhoneNumber,IsStrongPassword,IsNotEmpty,IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    bio:string;
    @IsPhoneNumber("MX")
    phone:string;
    @IsEmail()
    @IsLowercase()
    email:string;
    @IsStrongPassword()
    password:string;
    @IsOptional()
    avatarPath:string;
    @IsOptional()
    backgroundPath:string;
    avatar:[Object];
    backdround:[Object];
}