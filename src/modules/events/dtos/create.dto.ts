import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsIn
} from 'class-validator';
import { EVENTS } from 'src/config/events';

export class CreateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @IsIn(EVENTS) @ApiProperty() type: string
  @IsOptional() @IsString() @ApiProperty() ip?: string
}