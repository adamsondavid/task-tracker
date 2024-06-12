import { Component, output } from "@angular/core";
import { Button } from "./button";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-todo-form",
  standalone: true,
  imports: [Button, FormsModule],
  template: `
    <form class="w-full flex gap-2" (submit)="add($event)">
      <input
        type="text"
        [(ngModel)]="todo"
        (input)="error = ''"
        [ngModelOptions]="{ standalone: true }"
        class="flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        data-cy="create-todo-input"
      />
      <app-button dataCy="create-todo">Add</app-button>
    </form>
    @if (error) {
      <div class="text-red-600 flex gap-1 my-1">
        <span class="iconify uil--exclamation-triangle"></span>
        <span class="text-xs" data-cy="create-todo-validation-error">{{ error }}</span>
      </div>
    }
  `,
})
export class TodoForm {
  todo = "";
  error = "";
  readonly createTodo = output<string>();

  add(e: SubmitEvent) {
    e.preventDefault();
    if (!this.todo) {
      this.error = "Input might not be empty";
      return;
    } else {
      this.error = "";
    }
    this.createTodo.emit(this.todo);
    this.todo = "";
  }
}
