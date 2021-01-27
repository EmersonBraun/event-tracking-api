import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateEventDto } from '../dtos';
import { Event, EventDocument } from '../schema/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private repository: Model<EventDocument>,
  ) {}

  async search(data: any): Promise<Event[]> {
    return await this.repository.find({ ...data }).exec()
  }

  async create(data: any): Promise<Event> {

    return await this.repository.create(data);
  }

  async findById(id: string): Promise<Event> {
    const registry = await this.repository.findById(id).exec();

    if (!registry) {
      throw new NotFoundException('Registry not found');
    }

    return registry;
  }

  async update(id: string, data: UpdateEventDto): Promise<Event> {
    return await this.repository.findOneAndUpdate({ _id: id }, { ...data }, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.repository.findOneAndDelete({ _id: id }).exec();
  }
}