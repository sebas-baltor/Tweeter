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
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(404)
  async findById(@Param('id') id, @Request() req): Promise<User> {
    return await this.usersService.findById(id);
  }
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('follow/:followId')
  async addFriend(@Param('followId') followId, @Request() req) {
    return await this.usersService.followPeople({ id: req.user.id, followId });
  }
}
