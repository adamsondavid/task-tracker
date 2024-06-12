import { Component } from "@angular/core";
import { Button } from "../components/button";
import { Router, RouterLink } from "@angular/router";
import { BoardStore } from "../stores/board-store";

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [Button, RouterLink],
  template: `
    <div class="flex min-h-full justify-center items-center">
      <div class="flex flex-col gap-6 w-10/12 sm:w-8/12 2xl:w-6/12 py-6">
        <div class="text-3xl lg:text-6xl font-bold">
          <h1 class="inline-block bg-gradient-to-r from-red-900 to-red-500 bg-clip-text text-transparent">
            TaskTracker.
          </h1>
          <p>A simple ToDo list app with a Kanban-like column layout 📝</p>
        </div>
        <div class="flex gap-2 flex-col sm:flex-row">
          <app-button (click)="createBoard()" dataCy="create-board">Create a Board</app-button>
          <app-button type="external_link" variant="secondary" href="https://github.com/adamsondavid/task-tracker">
            <span class="iconify uil--github align-bottom text-2xl"></span>
            View Code on GitHub
          </app-button>
        </div>
      </div>
    </div>
  `,
})
export class LandingPage {
  constructor(
    private readonly router: Router,
    private readonly boardStore: BoardStore,
  ) {}

  async createBoard() {
    await this.boardStore.createBoard();
    const board = this.boardStore.board();
    if (board) await this.router.navigate(["boards", board.id]);
    else console.error("failed to create new board");
  }
}
