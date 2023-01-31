import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
export const EVENTS = ['focus', 'blur', 'focusin', 'focusout', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel']

export class UpdateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @IsIn(EVENTS) @ApiProperty() type: string
  @IsOptional() @IsString() @ApiProperty() ip: string
}