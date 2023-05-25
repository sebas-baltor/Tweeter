import { IsNotEmpty, IsEnum } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
enum TweetInteractions {
  like = 'likes',
  retweet = 'retweetBy',
  save = 'saved',
}
export default class InteractionDto {
  @IsNotEmpty()
  who: string;
  @IsEnum(TweetInteractions, {
    message: `The interaction should be: ${Object.values(
      TweetInteractions,
    ).join(', ')}`,
    context: { statusCode: HttpStatus.BAD_REQUEST },
  })
  interaction: TweetInteractions;
  @IsNotEmpty()
  tweetId:string;
}
export type TweetInteractionsString = keyof typeof TweetInteractions;
