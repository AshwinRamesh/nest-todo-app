import { Injectable } from "@nestjs/common";
import { Todolist, TodolistItem } from "../todolist.dto";
import { TodolistRepository } from "./todolist.repository.interface";


@Injectable()
export class TodolistLocalRepository implements TodolistRepository {
    
    // Current unique id of the todoList - not threadsafe AFAIK
    private todoListCurrentId: number;
    // Current unique id of an item in a todo list - not threadsave AFAIK
    private itemCurrentId: number;

    // Todolist Id --> name of list
    private todoListMap: {[k: number]: Todolist}
    
    // Item Id --> {todoList.id, item description}
    private itemMap: {[k: number]: TodolistItem}

    constructor() {
        this.todoListCurrentId = 0;
        this.itemCurrentId = 0;
        this.todoListMap = {};
        this.itemMap = {};

        console.log('TodolistLocalRepository is ready!');
    }
    
    getTodolist(todolistId: number): Todolist | null {
        if (todolistId in this.todoListMap) {
            return this.todoListMap[todolistId];
        }
        return null;
    }
    
    getTodolistItem(todolistId: number, itemId: number): TodolistItem | null {
        if (todolistId in this.todoListMap && itemId in this.itemMap 
            && this.itemMap[itemId].todoListId === todolistId) {
            return this.itemMap[itemId];
        }
        return null;
    }
    
    createTodolist(name: string): Todolist {
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
    createTodolistItem(todolistId: number, itemName: string): TodolistItem {
        if (todolistId in this.todoListMap === false) {
            throw new Error(`Todolist with id ${todolistId} does not exist`);
        }
        
        const item: TodolistItem = {
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
    
    updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Todolist {
        const tl = this.getTodolist(todoListId);
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
    
    updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): TodolistItem {
        const item = this.getTodolistItem(todoListId, itemId)
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