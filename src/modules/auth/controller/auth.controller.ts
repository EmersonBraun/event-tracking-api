import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt.guard';
import { ErrorResponse } from '../../../common/responses';
import { CreateUserDto } from '../../user/dtos';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../service/auth.service';


@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new auth' })
  @ApiCreatedResponse({ type: LoginDto, description: 'Logged' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Not logged', })
  async login(@Body() data: LoginDto): Promise<any> {
    return this.service.login(data);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Request() req: any): Promise<CreateUserDto> {
    return req.user;
  }
}