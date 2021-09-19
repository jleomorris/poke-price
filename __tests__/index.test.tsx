// __tests__/index.test.jsx

// Comment below configures the testing environment as jsdom inside the test file because React Testing Library uses DOM elements like document.body which will not work in Jest's default node
// testing environment. Alternatively, you can also set the jsdom environment globally by adding the Jest configuration option: "testEnvironment": "jsdom" in jest.config.js

/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "NextJS Modern Template",
    });

    expect(heading).toBeInTheDocument();
  });
});
