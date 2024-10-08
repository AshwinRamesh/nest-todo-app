import { Injectable } from '@nestjs/common';
import { Item, Todolist, TodolistServiceInterface } from './todolistServiceInterface';

// TODO - need to impl with sqllite later.
@Injectable()
export class TodolistDbServiceService implements TodolistServiceInterface{
    createTodolist(name: string): Todolist {
        throw new Error('Method not implemented.');
    }
    addItem(todolistId: number, itemDetails: string): Item {
        throw new Error('Method not implemented.');
    }
    getItem(todolistId: number, itemId: number): Item {
        throw new Error('Method not implemented.');
    }
    getTodoList(todolistId: number): Todolist {
        throw new Error('Method not implemented.');
    }
    markItemAsCompleted(todolistId: number, itemId: number): boolean {
        throw new Error('Method not implemented.');
    }
    markTodolistAsCompleted(todolistId: number): boolean {
        throw new Error('Method not implemented.');
    }

}
