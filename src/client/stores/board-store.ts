import { Inject, Injectable, signal } from "@angular/core";
import { API, Api } from "../api";
import { Board, Status } from "../../common/contract";
import { produce } from "immer";

@Injectable({
  providedIn: "root",
})
export class BoardStore {
  private readonly _boardStatus = signal<"LOADING" | "ERROR" | "OK">("OK");
  private readonly _board = signal<Board | undefined>(undefined);

  constructor(@Inject(API) private readonly api: Api) {}

  get boardStatus() {
    return this._boardStatus.asReadonly();
  }

  get board() {
    return this._board.asReadonly();
  }

  async createBoard() {
    this._boardStatus.set("LOADING");
    this._board.set(undefined);
    const res = await this.api.postBoard({ body: { name: "Untitled Board" } });
    if (res.status === 200) {
      this._board.set(res.body);
      this._boardStatus.set("OK");
    } else this._boardStatus.set("ERROR");
  }

  async loadBoardIfNotLoadedYet(id: string) {
    if (this._board()?.id === id) return;
    this._boardStatus.set("LOADING");
    this._board.set(undefined);
    const res = await this.api.getBoard({ params: { id } });
    if (res.status === 200) {
      this._board.set(res.body);
      this._boardStatus.set("OK");
    } else this._boardStatus.set("ERROR");
  }

  async createTodo(name: string, status: Status) {
    const boardId = this._board()?.id;
    if (!boardId) return "ERROR";
    const res = await this.api.postTodo({ body: { name, status, boardId } });
    if (res.status === 200) {
      this._board.update((board) => {
        return produce(board, (board) => {
          board?.todos.push(res.body);
        });
      });
      return "OK";
    } else return "ERROR";
  }

  async deleteTodo(id: string) {
    const res = await this.api.deleteTodo({ params: { id }, body: {} });
    if (res.status === 200) {
      this._board.update((board) => {
        return produce(board, (board) => {
          board?.todos.splice(
            board?.todos.findIndex((todo) => todo.id === id),
            1,
          );
        });
      });
      return "OK";
    } else return "ERROR";
  }
}
