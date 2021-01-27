import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { IP } from '../../../common/decorators/Ip.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt.guard';
import { ErrorResponse } from '../../../common/responses';
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
  @ApiOperation({ summary: 'List all Event ou filtered by querystring' })
  @ApiQuery({ name: 'name', example: 'test', required: false})
  @ApiQuery({ name: 'type', example: 'test', required: false})
  @ApiQuery({ name: 'ip', example: '127.0.0.1', required: false})
  @ApiOkResponse({ type: [CreateEventDto], description: 'The found Event' })
  async findAll(@Query() query?): Promise<Event[]> {
    return await this.service.search(query);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Create a new Event' })
  @ApiCreatedResponse({ type: CreateEventDto, description: 'Created Event' }) 
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Bad Request', })
  async create(@Body() data: CreateEventDto, @IP() ip: any): Promise<Event> {
    return await this.service.create({...data, ip });
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