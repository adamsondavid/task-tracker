import { Component, computed, input, signal, Signal, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { Button } from "./button";

export type TableItem = { [key: string]: any };

export type TableFields<T extends TableItem> = {
  [key in keyof T]?: {
    name: string;
    sortable?: boolean;
    template?: Signal<TemplateRef<any> | undefined>;
  };
};

@Component({
  selector: "app-table",
  standalone: true,
  imports: [NgTemplateOutlet, Button],
  template: `
    <div class="text-sm border rounded border-gray-200">
      <table class="w-full">
        <tr class="border-b border-gray-300">
          @for (key of tableFieldKeys(); track key) {
            <th class="p-1 text-left font-medium text-muted-foreground">
              @if (tableFields()[key]!.sortable) {
                <app-button (click)="sort(key)" variant="ghost">
                  {{ tableFields()[key]!.name }}
                  <span class="iconify uil--arrow rotate-90"></span>
                </app-button>
              } @else {
                <span class="px-4">{{ tableFields()[key]!.name }}</span>
              }
            </th>
          }
        </tr>
        @for (item of sortedTableItems(); track item) {
          <tr class="border-b last:border-0 hover:bg-gray-50">
            @for (key of tableFieldKeys(); track key) {
              <td class="p-3">
                @if (tableFields()[key]!.template) {
                  <ng-container
                    *ngTemplateOutlet="tableFields()[key]!.template!() ?? null; context: { $implicit: item }"
                  />
                } @else {
                  {{ item[key] }}
                }
              </td>
            }
          </tr>
        }
      </table>
    </div>
  `,
})
export class Table<T extends TableItem> {
  readonly tableItems = input.required<T[]>();
  readonly tableFields = input.required<TableFields<T>>();
  readonly tableFieldKeys = computed(() => Object.keys(this.tableFields()));

  readonly sortField = signal<undefined | keyof T>(undefined);
  readonly sortAsc = signal(false);
  readonly sortedTableItems = computed(() => {
    if (this.sortField()) {
      return this.tableItems().toSorted((itemA, itemB) => {
        const a = itemA[this.sortField()!];
        const b = itemB[this.sortField()!];
        let ret = 0;
        if (a < b) ret = 1;
        if (a > b) ret = -1;
        if (this.sortAsc()) ret *= -1;
        return ret;
      });
    } else return this.tableItems();
  });

  sort(key: keyof T) {
    this.sortField.set(key);
    this.sortAsc.update((asc) => !asc);
  }
}
