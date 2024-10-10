import { TodolistDTO, TodolistItemDTO } from "../todolist.dto";

export interface TodolistService {

    createTodolist(name: string): Promise<TodolistDTO>;

    addItem(todolistId: number, itemDetails: string): Promise<TodolistItemDTO>;

    getItem(todolistId: number, itemId: number): Promise<TodolistItemDTO>;

    getTodoList(todolistId: number): Promise<TodolistDTO>;

    markItemAsCompleted(todolistId: number, itemId: number): Promise<boolean>;

    markTodolistAsCompleted(todolistId: number): Promise<boolean>;

}

export const TodolistService = Symbol("TodolistService");

