import { Component, input, output } from "@angular/core";
import { Todo as TodoT } from "../../common/contract";
import { Button } from "./button";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [Button, DatePipe],
  template: `<div class="rounded border p-4 flex hover:bg-gray-50" data-cy="todo">
    <div class="w-full">
      <p data-cy="todo-name">{{ todo().name }}</p>
      <span class="text-xs text-muted-foreground">Last updated: {{ todo().lastUpdated | date: "short" }}</span>
    </div>
    <app-button (click)="delete.emit()" variant="destructive" size="icon" dataCy="delete-todo">
      <span class="iconify uil--trash"></span>
    </app-button>
  </div>`,
})
export class Todo {
  readonly todo = input.required<TodoT>();
  readonly delete = output();
}
