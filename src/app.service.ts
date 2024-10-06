import { Inject, Injectable } from '@nestjs/common';
import { TodolistServiceInterface } from './todolist/todolistService/todolistServiceInterface';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
