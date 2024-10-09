import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodolistService} from './todolist.service.interface';
import { TodolistRepository } from '../repository/todolist.repository.interface';
import { Todolist, TodolistItem } from '../todolist.dto';


@Injectable()
export class TodolistServiceImpl implements TodolistService{

    constructor(@Inject('TodolistRepository') private readonly repository: TodolistRepository) {
        console.log('TL Service local is ready today!');
        console.log('REPO', repository);
    }

    createTodolist(name: string): Todolist {
        console.log(name);
        return this.repository.createTodolist(name);
        
    }
    addItem(todolistId: number, itemName: string): TodolistItem {
        return this.repository.createTodolistItem(todolistId, itemName);
    }

    getItem(todolistId: number, itemId: number): TodolistItem {
        const item = this.repository.getTodolistItem(todolistId, itemId);
        if (item) {return item;}
        throw new NotFoundException(`Invalid todoListId and/or itemid`);
    }
    
    getTodoList(todolistId: number): Todolist {
        const tl = this.repository.getTodolist(todolistId);
        if (tl) {return tl;}
        throw new NotFoundException(`Invalid todoListId: ${todolistId}`);
    }
    markItemAsCompleted(todolistId: number, itemId: number): boolean {
        const item = this.repository.updateTodolistItem(todolistId, itemId, undefined, true);
        if (item) {
            return true;
        }
        return false;
    }

    markTodolistAsCompleted(todolistId: number): boolean {
        const tl = this.repository.updateTodolist(todolistId, undefined, true);
        if (tl) {
            return true;
        }
        return false;
    }
}
