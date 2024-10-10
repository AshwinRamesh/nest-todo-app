import { Injectable } from "@nestjs/common";
import { TodolistDTO, TodolistItemDTO } from "../todolist.dto";
import { TodolistRepository } from "./todolist.repository.interface";


@Injectable()
export class TodolistLocalRepository implements TodolistRepository {
    
    // Current unique id of the todoList - not threadsafe AFAIK
    private todoListCurrentId: number;
    // Current unique id of an item in a todo list - not threadsave AFAIK
    private itemCurrentId: number;

    // Todolist Id --> name of list
    private todoListMap: {[k: number]: TodolistDTO}
    
    // Item Id --> {todoList.id, item description}
    private itemMap: {[k: number]: TodolistItemDTO}

    constructor() {
        this.todoListCurrentId = 0;
        this.itemCurrentId = 0;
        this.todoListMap = {};
        this.itemMap = {};

        console.log('TodolistLocalRepository is ready!');
    }
    
    async getTodolist(todolistId: number): Promise<TodolistDTO | null> {
        if (todolistId in this.todoListMap) {
            return this.todoListMap[todolistId];
        }
        return null;
    }
    
    async getTodolistItem(todolistId: number, itemId: number): Promise<TodolistItemDTO | null> {
        if (todolistId in this.todoListMap && itemId in this.itemMap 
            && this.itemMap[itemId].todoListId === todolistId) {
            return this.itemMap[itemId];
        }
        return null;
    }
    
    async createTodolist(name: string): Promise<TodolistDTO> {
        const tl: TodolistDTO = {
            id: this.todoListCurrentId,
            name: name,
            items: [],
            isCompleted: false,
        }

        this.todoListMap[tl.id] = tl;
        this.todoListCurrentId += 1;

        return tl;
    }
    async createTodolistItem(todolistId: number, itemName: string): Promise<TodolistItemDTO> {
        if (todolistId in this.todoListMap === false) {
            throw new Error(`Todolist with id ${todolistId} does not exist`);
        }
        
        const item: TodolistItemDTO = {
            id: this.itemCurrentId,
            name: itemName,
            isCompleted: false,
            todoListId: todolistId
        }
        this.itemCurrentId += 1

        this.itemMap[item.id] = item;
        this.todoListMap[item.todoListId].items.push(item);

        return item;
    }
    
    async updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Promise<TodolistDTO> {
        const tl = await this.getTodolist(todoListId);
        if (tl && (name != undefined || isCompleted != undefined)) {
            if (name != undefined) {
                tl.name = name;
            }
            if (isCompleted != undefined) {
                tl.isCompleted = isCompleted;
            }
            return tl;
        }
        throw new Error("Could not update todolist.");
    }
    
    async updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): Promise<TodolistItemDTO> {
        const item = await this.getTodolistItem(todoListId, itemId)
        if (item && (itemName != undefined || isCompleted != undefined)) {
            if (itemName != undefined) {
                item.name = itemName;
            }
            if (isCompleted != undefined) {
                item.isCompleted = isCompleted;
            }
            return item;
        }
        throw new Error("Could not update todolist item.");
    }


}