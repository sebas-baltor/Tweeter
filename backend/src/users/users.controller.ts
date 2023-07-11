import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags,ApiOperation,ApiConsumes, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger/dist/decorators';
@Controller('users')
@ApiTags("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: 'create a new user' })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseInterceptors(
    // name of images to store
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File;
      background?: Express.Multer.File;
    },
    @Body() createUserDto: CreateUserDto,
  ) {
    // path of every single image, make it easy to access for the client
    createUserDto.avatarPath = `/files/user-media/${files.avatar[0].filename}`;
    createUserDto.backgroundPath = `/files/user-media/${files.background[0].filename}`;
    // service to store a user
    return await this.usersService.create(createUserDto);
  }
  @Get('top')
  @ApiOperation({ summary: 'return the top 20 most followed users' })
  async GetTop20(): Promise<User[]> {
    return await this.usersService.top();
  }
  @Get(':id')
  @HttpCode(HttpStatus.NOT_FOUND)
  @ApiOperation({ summary: 'return a user by id' })
  @ApiParam({name:"id",type:"ObjectId or string", description:"identify a every single user"})
  async findById(@Param('id') id): Promise<User> {
    return await this.usersService.findById(id);
  }
  @ApiBearerAuth()
  @ApiOperation({summary:"add a follow"})
  @ApiParam({name:"followId",description:"Identify who is you want to follow",type:"ObjectId or string"})
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('follow/:followId')
  async addFriend(@Param('followId') followId, @Request() req) {
    return await this.usersService.followPeople({ id: req.user.id, followId });
  }
}
