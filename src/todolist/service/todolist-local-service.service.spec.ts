import { Test, TestingModule } from '@nestjs/testing';
import { TodolistServiceImpl } from './todolist.service.impl';

describe('TodolistServiceImpl', () => {
  let service: TodolistServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodolistServiceImpl],
    }).compile();

    service = module.get<TodolistServiceImpl>(TodolistServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
