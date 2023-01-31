import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length
} from 'class-validator';

export class CreateUserDto {
  @IsString() @ApiProperty() name: string
  @IsString() @IsEmail() @ApiProperty() email: string 
  @IsString() @Length(3, 20) @ApiProperty() password: string
}