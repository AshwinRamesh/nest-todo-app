import { Injectable, NotFoundException } from '@nestjs/common';
import { TodolistServiceInterface, Todolist, Item } from './todolistServiceInterface';


@Injectable()
export class TodolistLocalServiceService implements TodolistServiceInterface{
    
    // Current unique id of the todoList - not threadsafe AFAIK
    private todoListCurrentId: number;
    // Current unique id of an item in a todo list - not threadsave AFAIK
    private itemCurrentId: number;

    // Todolist Id --> name of list
    private todoListMap: {[k: number]: Todolist}
    
    // Item Id --> {todoList.id, item description}
    private itemMap: {[k: number]: Item}

    constructor() {
        this.todoListCurrentId = 0;
        this.itemCurrentId = 0;
        this.todoListMap = {};
        this.itemMap = {};

        console.log('TL Service local is ready today!');
    }

    createTodolist(name: string): Todolist {
        console.log(name);
        const tl: Todolist = {
            id: this.todoListCurrentId,
            name: name,
            items: [],
            isCompleted: false,
        }

        this.todoListMap[tl.id] = tl;
        this.todoListCurrentId += 1;

        return tl;
        
    }
    addItem(todolistId: number, itemDetails: string): Item {
        if (todolistId in this.todoListMap === false) {
            throw new Error(`Todolist with id ${todolistId} does not exist`);
        }
        
        const item: Item = {
            id: this.itemCurrentId,
            description: itemDetails,
            isCompleted: false,
            todoListId: todolistId
        }
        this.itemCurrentId += 1

        this.itemMap[item.id] = item;
        this.todoListMap[item.todoListId].items.push(item);

        return item;
    }
    getItem(todolistId: number, itemId: number): Item {
        if (todolistId in this.todoListMap && itemId in this.itemMap 
            && this.itemMap[itemId].todoListId === todolistId) {
            return this.itemMap[itemId];
        }
        throw new NotFoundException(`Invalid todoListId and/or itemid`);
    }
    
    getTodoList(todolistId: number): Todolist {
        if (todolistId in this.todoListMap) {
            return this.todoListMap[todolistId];
        }
        throw new NotFoundException(`Invalid todoListId: ${todolistId}`);
    }
    markItemAsCompleted(todolistId: number, itemId: number): boolean {
        const item = this.getItem(todolistId, itemId);
        item.isCompleted = true;
        return true;
    }
    markTodolistAsCompleted(todolistId: number): boolean {
        const tl = this.getTodoList(todolistId);
        tl.isCompleted = true;
        return true;
    }
}
