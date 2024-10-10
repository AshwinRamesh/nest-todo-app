import { Cascade, Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { TodolistItem } from './TodolistItem';

@Entity()
export class Todolist extends BaseEntity {

  @Property()
  name: string;

  @Property({default: false}) // TODO - default?
  isCompleted: boolean;

  @OneToMany({ mappedBy: 'todolist', type: 'TodolistItem'})
  items = new Collection<TodolistItem>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }

}