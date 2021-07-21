import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog /> Component", () => {
  describe("initially", () => {
    let component;
    beforeEach(() => {
      const blog = {
        title: "Blog 1",
        author: "Blog writer 1",
        url: "www.blog1.com",
        likes: 0,
        id: 0,
      };
      const likeBlog = jest.fn();
      const deleteBlog = jest.fn();
      component = render(
        <Blog
          blog={blog}
          user={{}}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      );
    });

    test("title and author should be rendered", () => {
      expect(component.queryByText("Blog 1")).toBeDefined();
      expect(component.queryByText("Blog writer 1")).toBeDefined();
    });

    test("does not render the url or number of likes", () => {
      expect(component.queryByText("www.blog1.com")).toBeNull();
      expect(component.queryByText("likes 0")).toBeNull();
    });
  });

  describe("clicking the view button show more info about blog", () => {
    let component;
    beforeEach(() => {
      const blog = {
        title: "Blog 1",
        author: "Blog writer 1",
        url: "www.blog1.com",
        likes: 0,
        id: 0,
        user: {
          username: "bob",
        },
      };
      const likeBlog = jest.fn();
      const deleteBlog = jest.fn();
      component = render(
        <Blog
          blog={blog}
          user={{
            username: "bob",
          }}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      );
    });

    test("url and number of likes should be shown", () => {
      userEvent.click(component.getByText("view"));

      expect(component.queryByText("www.blog1.com")).not.toBeNull();
      expect(component.queryByText("likes 0")).not.toBeNull();
    });
  });
});
