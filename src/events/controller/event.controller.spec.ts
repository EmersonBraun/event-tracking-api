import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { closeInMongodConnection, rootMongooseTestModule } from '../../../test/utils/mongo-test-module';
import { CreateEventDto } from '../dtos';
import { fakerRegistry } from '../factory/event.factory';
import { EventSchema } from '../schema/event.schema';
import { EventService } from '../service/event.service';
import { EventController } from './event.controller';

describe('EventController', () => {

  let controller: EventController;
  let mockRegistry: CreateEventDto;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    search: jest.fn(),
    findById: jest.fn(),
    // update: jest.fn(),
    // delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      controllers: [EventController],
      providers: [{ provide: EventService, useValue: mockService }],
    }).compile();

    controller = module.get<EventController>(EventController);
    mockRegistry = fakerRegistry()
  });

  beforeEach(() => {
    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.search.mockReset();
    mockService.findById.mockReset();
    // mockService.update.mockReset();
    // mockService.delete.mockReset();
  });
  
  afterAll(async () => {
    await closeInMongodConnection();
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('when create Event', () => {
    it('should create a Event and return it', async () => {
      mockService.create.mockReturnValue(mockRegistry);

      const event: CreateEventDto = mockRegistry;

      const createdEvent = await controller.create(event);

      expect(createdEvent).toMatchObject(mockRegistry);
      expect(mockService.create).toBeCalledWith(event);
      expect(mockService.create).toBeCalledTimes(1);
    });
  });

  describe('when search all Event', () => {
    it('should search all Event and return them', async () => {
      mockService.findAll.mockReturnValue([mockRegistry]);

      const event = await controller.findAll();

      expect(event).toHaveLength(1);
      expect(event).toMatchObject([mockRegistry]);
      expect(mockService.findAll).toBeCalledTimes(1);
    });
  });

  describe('when search Event by id', () => {
    it('should find a existing Event and return it', async () => {
      mockService.findById.mockReturnValue(mockRegistry);

      const event = await controller.findById('1');

      expect(event).toMatchObject(mockRegistry);
      expect(mockService.findById).toBeCalledWith('1');
      expect(mockService.findById).toBeCalledTimes(1);
    });
  });

});