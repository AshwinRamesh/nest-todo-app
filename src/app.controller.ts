import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { TodolistService} from './todolist/service/todolist.service.interface';
import { FlagsLocalService } from './flags/service/flags.local.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
    @Inject(TodolistService) private readonly todolistService: TodolistService,
    private readonly flagService: FlagsLocalService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post("/createList")
  async createList(@Req() req: Request, @Body('name') name: string, @Body() body: any) {
    console.log(body);
    //console.log(req);
    const tl = await this.todolistService.createTodolist(name);
    console.log(tl.id, tl.name);
    return tl;
  }

  @Get('/list')
  async getList(@Req() req: Request, @Query('id') todolistId: number) {
    if (!todolistId) {
      throw new BadRequestException('The "id" field is required.');
    }
    const todolist = this.todolistService.getTodoList(todolistId);
    if (!todolist) {
      throw new NotFoundException('Todolist not found');
    }
    return todolist;
  }

  @Get('/item')
  async getItem(@Req() req: Request, @Query('listId') listId: number,  @Query('itemId') itemId: number) {
    if (!itemId) {throw new BadRequestException('Need ID');}
    return await this.todolistService.getItem(listId, itemId);
  }

  @Post("/createItem")
  async createItem(@Req() req: Request,@Body('listId') listId: number, @Body('name') name: string, @Body() body: any) {
    console.log(body);
    const tl = await this.todolistService.addItem(listId, name);
    console.log(tl.id, tl.name);
    return tl;
  }
  
  @Get('/flags')
  async getFlags() {
    console.log(this.flagService.getAll());
    return Object.fromEntries(this.flagService.getAll());
  }

}
