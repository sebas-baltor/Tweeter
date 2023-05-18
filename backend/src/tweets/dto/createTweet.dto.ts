import { IsNotEmpty,IsDate,IsBoolean } from "class-validator";
export class CreateTweetDto {
    @IsNotEmpty()
    from:string;
    @IsDate()
    publishDate:Date;
    @IsBoolean()
    visibility:boolean;
    
    tweetImgPath:string;

    figure:[Object];
}