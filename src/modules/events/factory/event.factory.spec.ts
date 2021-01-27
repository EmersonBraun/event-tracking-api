import { CreateEventDto } from '../dtos';
import { fakerRegistry } from './event.factory';

describe('EventFactory', () => {
  it('should create a factory and return it', async () => {
    const event: CreateEventDto = fakerRegistry();

    expect(event).toBe(event)
  });
});
