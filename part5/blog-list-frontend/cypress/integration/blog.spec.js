describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.request("POST", "http://localhost:3003/api/users", {
      username: "test",
      password: "test",
      name: "test",
    });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.get("#username");
    cy.get("#password");
    cy.get("button").contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("button").contains("Login").click();

      cy.contains("test logged in");
      cy.contains("Logged In");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("test");
      cy.get("#password").type("wrongPassword");
      cy.get("button").contains("Login").click();

      cy.get("html").should("not.contain", "Logged In");

      cy.get(".error").should(
        "have.css",
        "background-color",
        "rgb(245, 186, 188)"
      );

      cy.contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("button").contains("Login").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("www.test.com");
      cy.get("#submit-blog-button").click();

      cy.get(".blog-list").contains("test title test author");
    });
  });

  describe("When blog created", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
      cy.contains("create new blog").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("www.test.com");
      cy.get("#submit-blog-button").click();
    });

    it.only("a blog can be liked", function () {
      cy.contains("view").click();
      cy.contains("likes 0");
      cy.contains("like").click();
      cy.contains("likes 1");
    });
  });
});
