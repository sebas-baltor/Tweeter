import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request,Response,NextFunction} from "express";

@Injectable()
export class MessageMiddleware implements NestMiddleware{
    use(req:Request,res:Response,next:NextFunction){
        console.log("paso por el middleware")
        next();
    }
}