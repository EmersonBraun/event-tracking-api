import * as Faker from 'faker';
import { CreateUserDto } from '../dtos/create.dto';


export const fakerRegistry = ():CreateUserDto => {
  const faker = Faker
  return {
    name: faker.name.findName(),
    password: faker.name.findName(),
    email: faker.name.findName(),
  }
}