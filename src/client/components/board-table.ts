import { Component, input, TemplateRef, viewChild } from "@angular/core";
import { Board as BoardT, Todo } from "../../common/contract";
import { Table, TableFields } from "./table";
import { DatePipe, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-board-table",
  standalone: true,
  imports: [Table, DatePipe, NgIf, FormsModule],
  template: `
    <div class="p-8">
      <app-table [tableFields]="tableFields" [tableItems]="board().todos">
        <ng-template #id let-item>
          <span class="text-xs font-mono">{{ item.id }}</span>
        </ng-template>
        <ng-template #status let-item>
          <span *ngIf="item.status === 'TODO'">🔴 ToDo</span>
          <span *ngIf="item.status === 'IN_PROGRESS'">🟡 In Progress</span>
          <span *ngIf="item.status === 'DONE'">🟢 Done</span>
        </ng-template>
        <ng-template #lastUpdated let-item>{{ item.lastUpdated | date: "long" }}</ng-template>
      </app-table>
    </div>
  `,
})
export class BoardTable {
  readonly board = input.required<BoardT>();

  readonly idCellTemplate = viewChild<TemplateRef<any>>("id");
  readonly statusCellTemplate = viewChild<TemplateRef<any>>("status");
  readonly lastUpdatedCellTemplate = viewChild<TemplateRef<any>>("lastUpdated");

  readonly tableFields: TableFields<Todo> = {
    id: { name: "ID", template: this.idCellTemplate },
    name: { name: "ToDo", sortable: true },
    status: { name: "Status", sortable: true, template: this.statusCellTemplate },
    lastUpdated: { name: "Last Updated", sortable: true, template: this.lastUpdatedCellTemplate },
  };
}
