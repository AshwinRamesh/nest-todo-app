import { Test, TestingModule } from '@nestjs/testing';
import { TodolistLocalServiceService } from './todolist-local-service.service';

describe('TodolistLocalServiceService', () => {
  let service: TodolistLocalServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodolistLocalServiceService],
    }).compile();

    service = module.get<TodolistLocalServiceService>(TodolistLocalServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
