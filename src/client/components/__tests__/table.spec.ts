import { TestBed } from "@angular/core/testing";
import { Table } from "../table";

describe("table.ts", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Table],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(Table);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
