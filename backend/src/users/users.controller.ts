import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("create")
  @UseInterceptors(
    // name of images to store
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
      ]
    ),
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
    try{
      // service to store a user
      return await this.usersService.create(createUserDto);
    }catch(error){
      if (error.message === 'Email or Phone number already exists') {
        return { message: 'Email or Phone number already exists' };
      }
      throw error;
    }
  }

  @Get(':id')
  @HttpCode(404)
  async findById(@Param('id') id): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post("/:friendId/add-friend")
  async addFriend(@Param("friendId") friendId) {
    return "friend added"
  }
}
