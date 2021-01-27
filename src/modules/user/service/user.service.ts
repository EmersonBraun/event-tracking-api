import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dtos';
import { CreateUserDto } from '../dtos/create.dto';
// import { UpdateUserDto } from '../dtos/update.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private repository: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.find().exec()
  }

  async search(data: CreateUserDto): Promise<User[]> {
    return await this.repository.find({ ...data }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email }).lean();
  }

  async create(data: any): Promise<User> {

    return await this.repository.create(data);
  }

  async findById(id: string): Promise<User> {
    const registry = await this.repository.findById(id).exec();

    if (!registry) {
      throw new NotFoundException('Registry not found');
    }

    return registry;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.repository.findOneAndUpdate({ _id: id }, { ...data }, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.repository.findOneAndDelete({ _id: id }).exec();
  }
}