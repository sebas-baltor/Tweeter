import { ApiProperty } from "@nestjs/swagger";

export class ExcludeCommentDto {
    @ApiProperty({required:false,type:"array of string",example:'["64aca3361592c5da8d026827","64aca3361592c5da8d026817",...]',description:"represent all the commentsId to ignore "})   
    exclude:string[] = []
}