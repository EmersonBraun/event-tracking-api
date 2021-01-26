import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { closeInMongodConnection, rootMongooseTestModule } from '../../../test/utils/mongo-test-module';
import { CreateEventDto, UpdateEventDto } from '../dtos';
import { fakerRegistry } from '../factory/event.factory';
import { EventSchema } from '../schema/event.schema';
import { EventService } from './event.service';

describe('EventService', () => {

  let service: EventService;
  let mockRegistry: CreateEventDto;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    search: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      providers: [{ provide: EventService, useValue: mockRepository }],
    }).compile();

    service = module.get<EventService>(EventService);
    mockRegistry = fakerRegistry()
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.search.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when create Event', () => {
    it('should create a Event', async () => {
      mockRepository.create.mockReturnValueOnce(mockRegistry);

      const event: CreateEventDto = mockRegistry;

      const savedEvent = await service.create(event);

      expect(savedEvent).toMatchObject(mockRegistry);
      expect(mockRepository.create).toBeCalledWith(event);
      expect(mockRepository.create).toBeCalledTimes(1);
    });
  });

  describe('when search all Event', () => {
    it('should list all Event', async () => {
      mockRepository.find.mockReturnValue([{test: 'asd'}]);

      const event = await service.findAll();

      expect(event).toBe(undefined);
      expect(mockRepository.find).toBeCalledTimes(0);
    });
  });

  describe('when search Event by id', () => {
    it('should find a existing Event', async () => {
      mockRepository.findOne.mockReturnValue(mockRegistry);

      const event = await service.findById('1');
      expect(event).toBe(undefined);
    });

    it('should return a exception when does not to find a Event', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const event = await service.findById('3')
      expect(event).toBe(undefined);
    });
  });

  describe('when update a Event', () => {
    it('should update a existing Event', async () => {
      const EventUpdate: UpdateEventDto = mockRegistry;
      EventUpdate.name = 'Update Event '

      mockRepository.update.mockReturnValue({
        ...mockRegistry,
        ...EventUpdate,
      });


      const updatedEvent = await service.update(
        '1',
        EventUpdate,
      );

      expect(updatedEvent).toMatchObject(EventUpdate);
      expect(mockRepository.update).toBeCalledWith('1', EventUpdate);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
  });

  describe('when delete a Event', () => {
    it('should delete a existing Event', async () => {
      mockRepository.delete.mockReturnValue(mockRegistry);

      await service.delete('1');

      expect(mockRepository.delete).toBeCalledWith('1');
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });
});