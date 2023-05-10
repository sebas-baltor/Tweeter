import { Controller,Get,Param,Res,StreamableFile } from '@nestjs/common';
import { Response } from 'express';

@Controller('files')
export class FilesController {
    @Get("user-media/:path")
    getAvatar(@Param("path") path,@Res() res: Response){
        return res.sendFile(`/users/${path}`,{root:"./upload"})
    }
}
