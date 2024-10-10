import { Injectable } from "@nestjs/common";
import { TodolistDTO, TodolistItemDTO } from "../todolist.dto";
import { CreateRequestContext, EntityManager } from "@mikro-orm/core";
import { TodolistRepository } from "./todolist.repository.interface";
import { Todolist } from "src/entities/todolist";
import { TodolistItem } from "src/entities/TodolistItem";

@Injectable()
export class TodolistDbRepository implements TodolistRepository {
    
    constructor(private readonly em: EntityManager) {}
    async createTodolistItem(todoListId: number, itemName: string): Promise<TodolistItemDTO> {
        const tl = await this.getTodolist(todoListId);
        if (!tl) {
            throw new Error(`No Todolist with id ${todoListId}`);
        }
        
        const item = this.em.create(TodolistItem, {name: itemName, todolist: todoListId});
        await this.em.flush()

        return this.mapItem(item);        
    }

    async updateTodolist(todoListId: number, name?: string, isCompleted?: boolean): Promise<TodolistDTO> {
        throw new Error("Method not implemented.");
    }
    async updateTodolistItem(todoListId: number, itemId: number, itemName?: string, isCompleted?: boolean): Promise<TodolistItemDTO> {
        throw new Error("Method not implemented.");
    }
    async getTodolistItem(todolistId: number, itemId: number): Promise<TodolistItemDTO | null> {
        const tl = await this.em.findOne(TodolistItem, {$and: [{id: itemId}, {todolist: todolistId}]});
        if (tl) {
            return this.mapItem(tl);
        }
        return null;
    }
    
    @CreateRequestContext()
    async createTodolist(name: string): Promise<TodolistDTO> {
        const tl = new Todolist(name);
        await this.em.persist(tl).flush()
        const tlDto: TodolistDTO = {
            'id': tl.id,
            'name': tl.name,
            'items': [],
            'isCompleted': tl.isCompleted
        }
        console.log(tl.id, tl.isCompleted, tl.name);
        console.log(tl);
        return tlDto;
    }

    
    @CreateRequestContext()
    async getTodolist(todolistId: number): Promise<TodolistDTO | null> {
        const tl = await this.em.findOne(Todolist, todolistId);
        if (tl) {
            return this.mapTodolist(tl, true);
        }
        return null;
    }
    

    // TODO - This could be static
    private async mapTodolist(tl: Todolist, withItems:boolean=false): Promise<TodolistDTO> {
        const tlDTO =  {
            'id': tl.id,
            'name': tl.name,
            'items': [], // TODO - fix
            'isCompleted': tl.isCompleted
        };

        if (withItems === true) {
            await tl.items.load();
            for (const item of tl.items.getItems()) {
                tlDTO.items.push(this.mapItem(item));
            }
        }

        return tlDTO;
    }

    // TODO - is static. Move to seperate file.
    private mapItem(item: TodolistItem): TodolistItemDTO {
        return {
            id: item.id,
            name: item.name,
            todoListId: item.todolist.id,
            isCompleted: item.isCompleted
        }
    }

}