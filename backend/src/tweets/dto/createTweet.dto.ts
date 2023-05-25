import { IsNotEmpty,IsBooleanString,} from "class-validator";
export class CreateTweetDto {
    @IsNotEmpty()
    from:string;

    @IsBooleanString()
    visibility:boolean;

    @IsNotEmpty()
    content:string;

    publishDate:Date;
    
    imgPath:string;

    figure:[Object];
}