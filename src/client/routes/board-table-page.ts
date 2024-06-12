import { Component, OnInit } from "@angular/core";
import { BoardStore } from "../stores/board-store";
import { ActivatedRoute } from "@angular/router";
import { BoardTable } from "../components/board-table";

@Component({
  selector: "app-board-table-page",
  standalone: true,
  imports: [BoardTable],
  template: `
    @if (boardStatus() === "LOADING") {
      <div>Loading...</div>
    } @else if (boardStatus() === "ERROR") {
      <div>Error.</div>
    } @else if (boardStatus() === "OK" && board() !== undefined) {
      <app-board-table [board]="board()!" />
    }
  `,
})
export class BoardTablePage implements OnInit {
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
}
