import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { EVENTS } from 'src/config/events';

export class UpdateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @IsIn(EVENTS) @ApiProperty() type: string
  @IsOptional() @IsString() @ApiProperty() ip: string
}