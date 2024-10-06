import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistModule } from './todolist/todolist.module';

@Module({
  // TODO - add user module import after completed `UsersModule`
  imports: [TodolistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
