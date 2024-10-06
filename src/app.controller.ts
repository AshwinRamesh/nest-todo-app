import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { TodolistServiceInterface } from './todolist/todolistService/todolistServiceInterface';

@Controller()
export class AppController {

  constructor(@Inject(TodolistServiceInterface) private readonly todolistService: TodolistServiceInterface, 
  private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // TODO - this does not accept form data. need to import module..

  @Post("/createList")
  createList(@Req() req: Request, @Body('name') name: string, @Body() body: any) {
    console.log(body);
    //console.log(req);
    const tl = this.todolistService.createTodolist(name);
    console.log(tl.id, tl.name);
    return tl;
  }

  @Get('/list')
  getList(@Req() req: Request, @Query('id') todolistId: number) {
    if (!todolistId) {
      throw new BadRequestException('The "id" field is required.');
    }
    const todolist = this.todolistService.getTodoList(todolistId);
    if (!todolist) {
      throw new NotFoundException('Todolist not found');
    }
    return todolist;
  }
  
}
