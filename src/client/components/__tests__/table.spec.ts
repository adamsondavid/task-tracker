import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Table } from "../table";
import { Component, TemplateRef, viewChild } from "@angular/core";

describe("table.ts", () => {
  @Component({
    standalone: true,
    imports: [Table],
    template: `
      <app-table [tableFields]="tableFields" [tableItems]="tableItems">
        <ng-template #status let-item>{{ item.status.toUpperCase() }}</ng-template>
      </app-table>
    `,
  })
  class Wrapper {
    readonly statusTemplate = viewChild<TemplateRef<any>>("status");
    readonly tableFields = {
      id: { name: "ID", sortable: true },
      status: { name: "Status", template: this.statusTemplate },
    };
    readonly tableItems = [
      { id: 2, status: "ok" },
      { id: 1, status: "error" },
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Wrapper] }).compileComponents();
  });

  const mount = (): [HTMLElement, ComponentFixture<Wrapper>] => {
    const fixture = TestBed.createComponent(Wrapper);
    fixture.detectChanges();
    return [fixture.nativeElement, fixture];
  };

  it("renders", () => {
    const [wrapper] = mount();

    const table = wrapper.querySelectorAll("table");
    expect(table.length).toBe(1);

    const rows = table[0].querySelectorAll("tr");
    expect(rows.length).toBe(3);

    const headersCells = rows[0].querySelectorAll("th");
    expect(Array.from(headersCells).map((header) => header.textContent?.trim())).toEqual(["ID", "Status"]);

    const firstRowCells = rows[1].querySelectorAll("td");
    expect(Array.from(firstRowCells).map((td) => td.textContent)).toEqual(["2", "OK"]);

    const secondRowCells = rows[2].querySelectorAll("td");
    expect(Array.from(secondRowCells).map((td) => td.textContent)).toEqual(["1", "ERROR"]);
  });

  it("can be sorted", () => {
    const [wrapper, fixture] = mount();

    (wrapper.querySelector("table tr th app-button") as HTMLButtonElement)?.click();
    fixture.detectChanges();

    const idCells = wrapper.querySelectorAll("table tr td:first-child");
    expect(Array.from(idCells).map((cell) => cell.textContent)).toEqual(["1", "2"]);
  });
});
