import { IsNotEmpty, IsEnum } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
enum TweetInteractions {
  like = 'likes',
  save = 'saved',
}
export default class InteractionDto {
  @ApiProperty({required:true,description:"identify the active user",type:"ObjectId or string"})
  @IsNotEmpty()
  who: string;
  @ApiProperty({required:true,enum:TweetInteractions,description:"represent what you want to do with the tweet",type:TweetInteractions})
  @IsEnum(TweetInteractions, {
    message: `The interaction should be: ${Object.values(
      TweetInteractions,
    ).join(', ')}`,
    context: { statusCode: HttpStatus.BAD_REQUEST },
  })
  interaction: TweetInteractions;
  @ApiProperty({required:true,description:"indentify the tweet you might change",type:"ObjectId or string"})
  @IsNotEmpty()
  tweetId:string;
}
export type TweetInteractionsString = keyof typeof TweetInteractions;
