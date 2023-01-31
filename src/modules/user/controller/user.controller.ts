import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { JwtAuthGuard } from '../../../common/guards/jwt.guard';
import { ErrorResponse } from '../../../common/responses';
import { CreateUserDto } from '../dtos/create.dto';
import { UpdateUserDto } from '../dtos/update.dto';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';



@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List all User' })
  @ApiOkResponse({ type: [CreateUserDto], description: 'The found User' })
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Post()
  @HttpCode(201)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new User' })
  @ApiCreatedResponse({ type: UpdateUserDto, description: 'Created User' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Bad Request', })
  async create(@Body() data: CreateUserDto): Promise<User> {
    const userExists = await this.service.findByEmail(data.email);
    if (userExists) {
      throw new UnauthorizedException('User exists')
    }
    data.password = await hash(data.password, 10);
    return await this.service.create(data);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search a User by id' })
  @ApiOkResponse({ type: UpdateUserDto, description: 'The found User' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not Found' })
  async findById(@Param('id') id: string): Promise<User> {
    return await this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a User' })
  @ApiOkResponse({ type: UpdateUserDto, description: 'Updated User' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not Found' })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a User' })
  @ApiNoContentResponse({ description: 'Deleted User' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not Found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}