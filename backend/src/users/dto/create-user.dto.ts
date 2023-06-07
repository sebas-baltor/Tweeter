import {
  IsEmail,
  IsLowercase,
  IsPhoneNumber,
  IsStrongPassword,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  bio: string;
  @ApiProperty({
    required: true,
    description: 'telephone number only in MX format',
  })
  @IsPhoneNumber('MX')
  phone: string;
  @ApiProperty({
    required: true,
    description: 'email address all in lower case',
    example: 'myemail@gmail.com',
  })
  @IsEmail()
  @IsLowercase()
  email: string;
  @ApiProperty({
    required: true,
    description:
      'password must contain 8 characters in total, including numbers and special characters',
  })
  @IsStrongPassword()
  password: string;
  avatarPath: string;
  backgroundPath: string;
  @ApiProperty({
    description:
      'Its the object in form data who represent the profile picture only in [.jpeg .jpg .png .svg] format',
    type: 'string',
    format: 'binary',
    required: true,
    example:"img in [.jpeg, .png, .svg, .jpg] format"
  })
  avatar: [Object];
  @ApiProperty({
    description:
      'Its the object in form data who represent the background picture only in  [.jpeg .jpg .png .svg] format',
    type: 'string',
    format: 'binary',
    required: true,
    example:"img in [.jpeg, .png, .svg, .jpg] format"
  })
  backdround: [Object];
}
