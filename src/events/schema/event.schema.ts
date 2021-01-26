import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document; 

@Schema({timestamps: true})
export class Event {
  @Prop() name: string
  @Prop() type: string
  @Prop() ip: string
}
export const EventSchema = SchemaFactory.createForClass(Event)