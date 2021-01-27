import * as Faker from 'faker';
import { CreateEventDto } from '../dtos/create.dto';

const events = ['focus', 'blur', 'focusin','focusout', 'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel']
export const fakerRegistry = ():CreateEventDto => {
  const faker = Faker
  return {
    name: faker.random.arrayElement(['Focus', 'Mouse']),
    type: faker.random.arrayElement(events),
  }
}

export const fakerIp = () => Faker.internet.ip()
