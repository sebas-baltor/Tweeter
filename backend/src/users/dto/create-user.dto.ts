import { File } from "buffer";


export class CreateUserDto {
    name:string;
    bio:string;
    phone:string;
    email:string;
    password:string;
    avatarPath:string;
    backgroundPath:string;
    avatar:[Object];
    backdround:[Object];
}