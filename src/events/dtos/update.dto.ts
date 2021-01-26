import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @ApiProperty() type: string
  @IsString() @ApiProperty() ip: string
}