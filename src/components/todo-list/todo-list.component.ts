import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';


export type ToggleCompleteItemOutput = Todo;
export type EditItemOutput = Todo;
export type ReorderItemsOutput = {
  from: number,
  to: number
};
export type RemoveItemOutput = Todo;
export type TodosInput = Todo[];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'todo-list',
  templateUrl: 'todo-list.component.html',
})
export class TodoListComponent {
  @Input() public todos: TodosInput;
  @Output() public addItem = new EventEmitter();
  @Output() public toggleCompleteItem = new EventEmitter<ToggleCompleteItemOutput>();
  @Output() public editItem = new EventEmitter<EditItemOutput>();
  @Output() public reorderItems = new EventEmitter<ReorderItemsOutput>();
  @Output() public removeItem = new EventEmitter<RemoveItemOutput>();

  constructor() {
  }
}
