import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './controller/event.controller';
import { Event, EventSchema } from './schema/event.schema';
import { EventService } from './service/event.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService]
})
export class EventsModule {}
