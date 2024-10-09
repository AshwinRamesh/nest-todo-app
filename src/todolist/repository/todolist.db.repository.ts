import { Injectable } from "@nestjs/common";
import { Todolist, TodolistItem } from "../todolist.dto";
import { TodolistRepository } from "./todolist.repository.interface";

@Injectable()
export class TodolistDbRepository implements TodolistRepository {
    createTodolist(name: string): Todolist {
        throw new Error("Method not implemented.");
    }
    createTodolistItem(todoListId: number, itemName: string): TodolistItem {
        throw new Error("Method not implemented.");
    }
    updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Todolist {
        throw new Error("Method not implemented.");
    }
    updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): TodolistItem {
        throw new Error("Method not implemented.");
    }
    getTodolist(todolistId: number): Todolist | null {
        throw new Error("Method not implemented.");
    }
    getTodolistItem(todolistId: number, itemId: number): TodolistItem | null {
        throw new Error("Method not implemented.");
    }

}