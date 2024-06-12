import { Component, input, output } from "@angular/core";
import { Board as BoardT, Status, Todo as TodoT } from "../../common/contract";
import { Todo } from "./todo";
import { Button } from "./button";
import { TodoForm } from "./todo-form";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-board",
  standalone: true,
  imports: [Todo, Button, TodoForm, RouterLink],
  template: `<div>
    <div class="p-4 border-b">
      <h1 class="text-2xl" data-cy="board-name">{{ board().name }}</h1>
      <app-button variant="link" size="sm" routerLink="table">Show this Board in Table View</app-button>
    </div>
    <div class="flex gap-4 m-6">
      @for (status of statuses; track status.value) {
        <div class="basis-1/3" [attr.data-cy]="'todo-lane-for-status-' + status.value">
          <h2 class="text-center font-mono text-sm" data-cy="todo-lane-name">{{ status.name }}</h2>
          <div class=" flex flex-col gap-4">
            <app-todo-form (createTodo)="createTodo.emit({ name: $event, status: status.value })" />
            @for (todo of tasksByStatus(status.value); track todo.id) {
              <app-todo [todo]="todo" (delete)="deleteTodo.emit(todo)" />
            }
          </div>
        </div>
      }
    </div>
  </div>`,
})
export class Board {
  readonly board = input.required<BoardT>();
  readonly deleteTodo = output<TodoT>();
  readonly createTodo = output<{ name: string; status: Status }>();

  readonly statuses = [
    { name: "ToDo", value: "TODO" },
    { name: "In Progress", value: "IN_PROGRESS" },
    { name: "Done", value: "DONE" },
  ] as const;

  tasksByStatus(status: Status) {
    return this.board().todos.filter((todo) => todo.status === status);
  }
}
