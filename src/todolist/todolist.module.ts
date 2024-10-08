import { Module } from '@nestjs/common';
import { TodolistLocalServiceService } from './service/todolist-local-service.service';
import { TodolistDbServiceService } from './service/todolist-db-service.service';
import { TodolistServiceInterface } from './service/todolistServiceInterface';

@Module({
  providers: [
    { // TODO - check if this works as expected.
      provide: TodolistServiceInterface,
      useClass: process.env.NODE_ENV === 'production' ? TodolistDbServiceService : TodolistLocalServiceService,
      //useClass: TodolistLocalServiceService,
    }

  ],
  // This exports tells the module to make classes visible to other modules.
  exports: [TodolistServiceInterface]
})
export class TodolistModule {}