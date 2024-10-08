export type Item = {
    id: number;
    description: string;
    isCompleted: boolean;
    todoListId: number;
}

export type Todolist = {
    id: number;
    name: string,
    items: Item[];
    isCompleted: boolean;
}

export interface TodolistServiceInterface {

    createTodolist(name: string): Todolist;

    addItem(todolistId: number, itemDetails: string): Item;

    getItem(todolistId: number, itemId: number): Item;

    getTodoList(todolistId: number): Todolist;

    markItemAsCompleted(todolistId: number, itemId: number): boolean;

    markTodolistAsCompleted(todolistId: number): boolean;

}

export const TodolistServiceInterface = Symbol("TodolistServiceInterface");

