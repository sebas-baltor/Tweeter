import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetsService) {}
  //the top tweets of the top people
  @Get('top')
  async GetTopTweets() {
    return await this.tweetService.GetTop30Tweets();
  }
  // all tweets of a single user
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/:userId/all')
  async GetAllUserTweets(@Param('userId') userId: string) {
    return await this.tweetService.GetByUserId(userId);
  }
  // publish a tweet
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('publish')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('figure'))
  async PublishTweet(
    @Body() createTweetDto: CreateTweetDto,
    @UploadedFile() figure?: Express.Multer.File,
  ) {
    createTweetDto.publishDate = new Date();
    // set the path of this resourse
    if (figure) {
      createTweetDto.imgPath = `/files/tweet-figure/${figure.filename}`;
    }
    // if you are creating a retweet the origin tweet reference should bee empty
    if (
      createTweetDto.isRetweet === true &&
      (createTweetDto.originalTweetId === '' ||
        createTweetDto.originalTweetId === null)
    ) {
      return new BadRequestException(
        'a retweet must have the original tweet reference',
      );
    }
    //else find the original tweet and embedding
    if (createTweetDto.isRetweet) {
      let originalTweet = await this.tweetService.GetById(
        createTweetDto.originalTweetId,
      );
      await this.tweetService.AddRetweetNumber(createTweetDto.originalTweetId);
      createTweetDto.originalTweet = originalTweet;
    }
    return await this.tweetService.Publish(createTweetDto);
  }
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  @Post('like/:tweetId')
  @ApiOperation({ summary: 'Increace or decreace the number of likes' })
  @ApiParam({
    name: 'tweetId',
    type: 'ObjectId or string',
    description: 'identify a every single tweet',
  })
  @ApiBearerAuth()
  async AddLIke(@Param('tweetId') tweetId: string, @Request() req) {
    await this.tweetService.AddOrRemoveLike(tweetId, req.user.id);
  }
}
