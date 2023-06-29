import { Controller,Get,Param,Res,StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('files')
@ApiTags("files")
export class FilesController {
    @Get("user-media/:path")
    @ApiOperation({ summary: 'return an asset or img' })
  @ApiParam({
    name: 'path',
    type: 'string',
    description: 'identify the asset´s resourse',
  })
    getAvatar(@Param("path") path,@Res() res: Response){
        return res.sendFile(`/users/${path}`,{root:"./upload"})
    }
}
