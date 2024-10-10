import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodolistService} from './todolist.service.interface';
import { TodolistRepository } from '../repository/todolist.repository.interface';
import { TodolistDTO, TodolistItemDTO } from '../todolist.dto';


@Injectable()
export class TodolistServiceImpl implements TodolistService{

    constructor(@Inject(TodolistRepository) private readonly repository: TodolistRepository) {
        console.log('TL Service local is ready today!');
        console.log('REPO', repository);
    }

    async createTodolist(name: string): Promise<TodolistDTO> {
        console.log(name);
        return this.repository.createTodolist(name);
        
    }
    async addItem(todolistId: number, itemName: string): Promise<TodolistItemDTO> {
        return this.repository.createTodolistItem(todolistId, itemName);
    }

    async getItem(todolistId: number, itemId: number): Promise<TodolistItemDTO> {
        const item = this.repository.getTodolistItem(todolistId, itemId);
        if (item) {return item;}
        throw new NotFoundException(`Invalid todoListId and/or itemid`);
    }
    
    async getTodoList(todolistId: number): Promise<TodolistDTO> {
        const tl = this.repository.getTodolist(todolistId);
        if (tl) {return tl;}
        throw new NotFoundException(`Invalid todoListId: ${todolistId}`);
    }
    async markItemAsCompleted(todolistId: number, itemId: number): Promise<boolean> {
        const item = this.repository.updateTodolistItem(todolistId, itemId, undefined, true);
        if (item) {
            return true;
        }
        return false;
    }

    async markTodolistAsCompleted(todolistId: number): Promise<boolean> {
        const tl = this.repository.updateTodolist(todolistId, undefined, true);
        if (tl) {
            return true;
        }
        return false;
    }
}
