import { Module } from '@nestjs/common';
import { TodolistService } from './service/todolist.service.interface';
import { TodolistServiceImpl } from './service/todolist.service.impl';
import { TodolistDbRepository } from './repository/todolist.db.repository';
import { TodolistLocalRepository } from './repository/todolist.local.repository';

@Module({
  providers: [
    {
      provide: TodolistService,
      //useClass: process.env.NODE_ENV === 'production' ? TodolistDbServiceService : TodolistLocalServiceService,
      useClass: TodolistServiceImpl,
    },
    {
      provide: "TodolistRepository",
      useClass: process.env.NODE_ENV === 'production' ? TodolistDbRepository : TodolistLocalRepository
    }

  ],
  // This exports tells the module to make classes visible to other modules.
  exports: [TodolistService]
})
export class TodolistModule {}