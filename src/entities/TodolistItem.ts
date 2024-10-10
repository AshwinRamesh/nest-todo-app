import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Todolist } from "./todolist";

@Entity()
export class TodolistItem extends BaseEntity {
    @Property()
    name: string;
  
    @Property({default: false}) // TODO - default?
    isCompleted: boolean;

    @ManyToOne({})
    todolist: Todolist;

}