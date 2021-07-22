describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "test",
      username: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2021"
    );
  });

  it("login form can be opened", () => {
    cy.contains("Login").click();
  });

  it("user can login", function () {
    cy.contains("Login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();

    cy.contains("test logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
    });

    it("a new note can be created", function () {
      cy.contains("New Note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and several note exist", function () {
      beforeEach(function () {
        cy.createNote({
          content: "first note cypress",
          important: false,
        });
        cy.createNote({
          content: "second note cypress",
          important: false,
        });
        cy.createNote({
          content: "third note cypress",
          important: false,
        });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong Credentials");
    cy.get(".error").contains("Wrong Credentials");
    cy.get(".error")
      .should("contain", "Wrong Credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "test logged in");
  });
});
