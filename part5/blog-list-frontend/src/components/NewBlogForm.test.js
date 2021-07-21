import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";

describe("<NewBlogForm /> component", () => {
  let component;
  let createBlog = jest.fn().mockName("createBlog");

  beforeEach(() => {
    component = render(<NewBlogForm createBlog={createBlog} />);
  });

  test("it calls the submit blog function on submission with typed inputs", () => {
    userEvent.type(component.container.querySelector("#title"), "test title");
    userEvent.type(component.container.querySelector("#author"), "test author");
    userEvent.type(component.container.querySelector("#url"), "www.test.com");

    userEvent.click(component.getByText("Create"));

    expect(createBlog).toHaveBeenCalledWith({
      title: "test title",
      author: "test author",
      url: "www.test.com",
    });
  });
});
