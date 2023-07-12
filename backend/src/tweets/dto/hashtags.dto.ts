import { ApiProperty } from "@nestjs/swagger";
 
export class HashtagsDto {
    @ApiProperty({description:"is the hashtag string"})
    hashtag:string;
    @ApiProperty({description:"number of the tweets with the hashtag"})
    tweetsWithIt:number;
}