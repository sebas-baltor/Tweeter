import {IsNotEmpty} from "class-validator"
export class FollowRequest{
    @IsNotEmpty()
    id:string;
    @IsNotEmpty()
    followId:string;
}