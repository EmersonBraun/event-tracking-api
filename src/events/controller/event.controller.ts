import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { ErrorResponse } from '../../common/responses';
import { CreateEventDto } from '../dtos';
import { UpdateEventDto } from '../dtos/update.dto';
import { Event } from '../schema/event.schema';
import { EventService } from '../service/event.service';


@ApiTags('Event')
@Controller('events')
export class EventController {
  constructor(private service: EventService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Search all Event' })
  @ApiOkResponse({ type: [CreateEventDto], description: 'The found Event' })
  async findAll(): Promise<Event[]> {
    return await this.service.findAll();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Create a new Event' })
  @ApiCreatedResponse({ type: CreateEventDto, description: 'Created Event' }) 
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Bad Request', })
  async create(@Body() data: CreateEventDto): Promise<Event> {
    return await this.service.create(data);
  }


  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Search a Event by id' })
  @ApiOkResponse({ type: UpdateEventDto, description: 'The found Event' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'Not Found' })
  async findById(@Param('id') id: string): Promise<Event> {
    return await this.service.findById(id);
  }
}