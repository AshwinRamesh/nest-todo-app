import { Todolist, TodolistItem } from "../todolist.dto";

export interface TodolistRepository {

    createTodolist(name: string): Todolist;
    
    createTodolistItem(todoListId: number, itemName: string): TodolistItem;

    updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Todolist;

    updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): TodolistItem;

    getTodolist(todolistId: number): Todolist|null;

    getTodolistItem(todolistId: number, itemId: number): TodolistItem|null;
}