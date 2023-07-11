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
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { ObjectId } from 'mongoose';
import { ExcludeCommentDto } from 'src/comments/dto/exclude-comment.dto';
@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(
    private tweetService: TweetsService,
    private userService: UsersService,
    private commentService: CommentsService,
  ) {}
  //the top tweets of the top people
  @Get('top')
  async GetTopTweets() {
    return await this.tweetService.GetTop30Tweets();
  }
  // all tweets of a single user
  @ApiBearerAuth()
  @ApiOperation({ summary: 'return all the tweets of a single user' })

  @UseGuards(AuthGuard)
  @Get('/:userId/all')
  @ApiParam({
    name: 'userId',
    type: 'ObjectId or string',
    description: 'identify a every single user',
  })
  async GetAllUserTweets(@Param('userId') userId: string, @Request() req) {
    return await this.tweetService.GetAllByUserId(userId, req.user.id);
  }
  // return all tweet's comment
  @Get('/:tweetId/all-comments')
  @ApiParam({
    name: 'tweetId',
    type: 'ObjectId or string',
    description: 'identify a every single tweet',
  })
  async GetAllCommentsExcept(
    @Param('tweetId') tweetId: ObjectId,
    @Body() {exclude}: ExcludeCommentDto,
  ) {
    console.log(exclude)
    return await this.commentService.GetAllByIdAndNoReply(tweetId, exclude);
  }

  // publish a tweet
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('publish')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('figure'))
  async PublishTweet(
    @Request() req,
    @Body() createTweetDto: CreateTweetDto,
    @UploadedFile() figure?: Express.Multer.File,
  ) {
    createTweetDto.isRetweet = parseInt(createTweetDto.isRetweet.toString());
    createTweetDto.publishDate = new Date();
    // set the path of this resourse
    if (figure) {
      createTweetDto.imgPath = `/files/tweet-figure/${figure.filename}`;
    }
    // if you are creating a retweet the origin tweet reference should bee empty
    if (
      createTweetDto.isRetweet === 1 &&
      (createTweetDto.originalTweetId === '' ||
        createTweetDto.originalTweetId === null ||
        createTweetDto.originalTweetId === undefined)
    ) {
      console.log('id but not reference');
      return new BadRequestException(
        'a retweet must have the original tweet reference',
      );
    }
    //else find the original tweet an increase the retweet number and embedding
    if (createTweetDto.isRetweet === 1) {
      console.log('retweet');
      let originalTweet = await this.tweetService.GetOneById(
        createTweetDto.originalTweetId,
        req.user.id,
      );
      await this.tweetService.AddRetweetNumber(createTweetDto.originalTweetId);
      createTweetDto.originalTweet = originalTweet;
    }
    return await this.tweetService.Publish(createTweetDto, req.user.id);
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

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  @Post('save/:tweetId')
  @ApiOperation({
    summary: 'save or remove a tweet from the saved tweets stack',
  })
  @ApiParam({
    name: 'tweetId',
    type: 'ObjectId or string',
    description: 'identify a every single tweet',
  })
  @ApiBearerAuth()
  async Save(@Param('tweetId') tweetId: string, @Request() req) {
    await this.tweetService.GetOneById(tweetId, req.user.id);
    await this.userService.saveTweet(tweetId, req.user.id);
  }
}
