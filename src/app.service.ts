import { Inject, Injectable } from '@nestjs/common';
import { TodolistServiceInterface } from './todolist/service/todolistServiceInterface';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
