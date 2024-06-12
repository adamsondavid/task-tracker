describe("task-tracker", () => {
  it("renders landing page", () => {
    cy.visit("/");
    cy.get("h1").should("contain.text", "TaskTracker.");
    cy.get('[data-cy="create-board"]').should("be.visible");
  });

  function createNewBoard() {
    cy.visit("/");
    cy.get('[data-cy="create-board"]').click();
  }

  it("creates a new boards", () => {
    createNewBoard();
    cy.url().should("contain", "/boards/");
  });

  it("renders board correctly", () => {
    createNewBoard();
    cy.get('[data-cy="board-name"]').should("have.text", "Untitled Board");
    cy.get('[data-cy="todo-lane-for-status-TODO"] [data-cy="todo-lane-name"]').should("have.text", "ToDo");
    cy.get('[data-cy="todo-lane-for-status-IN_PROGRESS"] [data-cy="todo-lane-name"]').should(
      "have.text",
      "In Progress",
    );
    cy.get('[data-cy="todo-lane-for-status-DONE"] [data-cy="todo-lane-name"]').should("have.text", "Done");
  });

  ["TODO", "IN_PROGRESS", "DONE"].forEach((status) => {
    it(`creates and deletes todos in ${status} column`, () => {
      createNewBoard();
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo-input"]`).type("have dinner");
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo"]`).click();
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="todo-name"]`).should("have.text", "have dinner");
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="delete-todo"]`).click();
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="todo"]`).should("not.exist");
    });
  });

  ["TODO", "IN_PROGRESS", "DONE"].forEach((status) => {
    it(`renders validation error when trying to create empty todo in ${status} column`, () => {
      createNewBoard();
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo-validation-error"]`).should("not.exist");
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo"]`).click();
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo-validation-error"]`).should(
        "have.text",
        "Input might not be empty",
      );
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo-input"]`).type("have dinner");
      cy.get(`[data-cy="todo-lane-for-status-${status}"] [data-cy="create-todo-validation-error"]`).should("not.exist");
    });
  });
});
