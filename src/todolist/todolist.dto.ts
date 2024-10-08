export type TodolistItem = {
    id: number;
    name: string;
    isCompleted: boolean;
    todoListId: number;
}

export type Todolist = {
    id: number;
    name: string,
    items: TodolistItem[];
    isCompleted: boolean;
}