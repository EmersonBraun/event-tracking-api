import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { closeInMongodConnection, rootMongooseTestModule } from '../../../../test/utils/mongo-test-module';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { fakerRegistry } from '../factory/user.factory';
import { UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;
  let mockRegistry: CreateUserDto;

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
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [{ provide: UserService, useValue: mockRepository }],
    }).compile();

    service = module.get<UserService>(UserService);
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

  describe('when create User', () => {
    it('should create a User', async () => {
      mockRepository.create.mockReturnValueOnce(mockRegistry);

      const User: CreateUserDto = mockRegistry;

      const savedUser = await service.create(User);

      expect(savedUser).toMatchObject(mockRegistry);
      expect(mockRepository.create).toBeCalledWith(User);
      expect(mockRepository.create).toBeCalledTimes(1);
    });
  });

  describe('when search all User', () => {
    it('should list all User', async () => {
      mockRepository.find.mockReturnValue([{test: 'asd'}]);

      const User = await service.findAll();

      expect(User).toBe(undefined);
      expect(mockRepository.find).toBeCalledTimes(0);
    });
  });

  describe('when search User by id', () => {
    it('should find a existing User', async () => {
      mockRepository.findOne.mockReturnValue(mockRegistry);

      const User = await service.findById('1');
      expect(User).toBe(undefined);
    });

    it('should return a exception when does not to find a User', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const User = await service.findById('3')
      expect(User).toBe(undefined);
    });
  });

  describe('when update a User', () => {
    it('should update a existing User', async () => {
      const UserUpdate: UpdateUserDto = mockRegistry;
      UserUpdate.name = 'Update User '

      mockRepository.update.mockReturnValue({
        ...mockRegistry,
        ...UserUpdate,
      });


      const updatedUser = await service.update(
        '1',
        UserUpdate,
      );

      expect(updatedUser).toMatchObject(UserUpdate);
      expect(mockRepository.update).toBeCalledWith('1', UserUpdate);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
  });

  describe('when delete a User', () => {
    it('should delete a existing User', async () => {
      mockRepository.delete.mockReturnValue(mockRegistry);

      await service.delete('1');

      expect(mockRepository.delete).toBeCalledWith('1');
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });
});