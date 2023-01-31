import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsIn
} from 'class-validator';
const EVENTS = ['focus', 'blur', 'focusin', 'focusout', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel']

export class CreateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @IsIn(EVENTS) @ApiProperty() type: string
  @IsOptional() @IsString() @ApiProperty() ip?: string
}