export type TodolistItemDTO = {
    id: number;
    name: string;
    isCompleted: boolean;
    todoListId: number;
}

export type TodolistDTO = {
    id: number;
    name: string,
    items: TodolistItemDTO[];
    isCompleted: boolean;
}