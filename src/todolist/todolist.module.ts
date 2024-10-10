import { Module } from '@nestjs/common';
import { TodolistService } from './service/todolist.service.interface';
import { TodolistServiceImpl } from './service/todolist.service.impl';
import { TodolistDbRepository } from './repository/todolist.db.repository';
import { TodolistLocalRepository } from './repository/todolist.local.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodolistRepository } from './repository/todolist.repository.interface';

@Module({
  providers: [
    {
      provide: TodolistService,
      useClass: TodolistServiceImpl,
    },
    {
      provide: TodolistRepository,
      useClass: TodolistDbRepository
      //useClass: process.env.NODE_ENV === 'production' ? TodolistDbRepository : TodolistLocalRepository
    }

  ],
  imports: [MikroOrmModule,],
  // This exports tells the module to make classes visible to other modules.
  exports: [TodolistService]
})
export class TodolistModule {}