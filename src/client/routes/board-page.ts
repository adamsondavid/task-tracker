import { Component, OnInit } from "@angular/core";
import { BoardStore } from "../stores/board-store";
import { ActivatedRoute } from "@angular/router";
import { Board } from "../components/board";
import { Status, Todo as TodoT } from "../../common/contract";

@Component({
  selector: "app-board-page",
  standalone: true,
  imports: [Board],
  template: `
    @if (boardStatus() === "LOADING") {
      <div>Loading...</div>
    } @else if (boardStatus() === "ERROR") {
      <div>Error.</div>
    } @else if (boardStatus() === "OK" && board() !== undefined) {
      <app-board [board]="board()!" (deleteTodo)="deleteTodo($event)" (createTodo)="createTodo($event)" />
    }
  `,
})
export class BoardPage implements OnInit {
  readonly board;
  readonly boardStatus;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly boardStore: BoardStore,
  ) {
    this.board = boardStore.board;
    this.boardStatus = boardStore.boardStatus;
  }

  async ngOnInit() {
    await this.boardStore.loadBoardIfNotLoadedYet(this.route.snapshot.params.id);
  }

  async createTodo(todo: { name: string; status: Status }) {
    await this.boardStore.createTodo(todo.name, todo.status);
  }

  async deleteTodo(todo: TodoT) {
    await this.boardStore.deleteTodo(todo.id);
  }
}
