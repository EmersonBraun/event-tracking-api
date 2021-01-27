import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString
} from 'class-validator';

export class CreateEventDto {
  @IsString() @ApiProperty() name: string
  @IsString() @ApiProperty() type: string
  @IsOptional() @IsString() @ApiProperty() ip?: string
}