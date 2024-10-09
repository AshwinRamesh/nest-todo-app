import { Todolist, TodolistItem } from "../todolist.dto";

export interface TodolistService {

    createTodolist(name: string): Todolist;

    addItem(todolistId: number, itemDetails: string): TodolistItem;

    getItem(todolistId: number, itemId: number): TodolistItem;

    getTodoList(todolistId: number): Todolist;

    markItemAsCompleted(todolistId: number, itemId: number): boolean;

    markTodolistAsCompleted(todolistId: number): boolean;

}

export const TodolistService = Symbol("TodolistService");

