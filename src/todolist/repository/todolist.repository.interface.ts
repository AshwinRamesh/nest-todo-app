import { TodolistDTO, TodolistItemDTO } from "../todolist.dto";

export interface TodolistRepository {

    createTodolist(name: string): Promise<TodolistDTO>;
    
    createTodolistItem(todoListId: number, itemName: string): Promise<TodolistItemDTO>;

    updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Promise<TodolistDTO>;

    updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): Promise<TodolistItemDTO>;

    getTodolist(todolistId: number): Promise<TodolistDTO|null>;

    getTodolistItem(todolistId: number, itemId: number): Promise<TodolistItemDTO|null>;
}

export const TodolistRepository = Symbol("TodolistRepository");