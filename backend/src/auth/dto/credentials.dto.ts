import {IsNotEmpty} from "class-validator";
export class Credentials {
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    email:string;
}