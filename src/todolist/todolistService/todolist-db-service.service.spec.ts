import { Test, TestingModule } from '@nestjs/testing';
import { TodolistDbServiceService } from './todolist-db-service.service';

describe('TodolistDbServiceService', () => {
  let service: TodolistDbServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodolistDbServiceService],
    }).compile();

    service = module.get<TodolistDbServiceService>(TodolistDbServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
