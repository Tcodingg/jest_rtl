import { render, screen } from "@testing-library/react";

import App from "./App";

describe("routing", () => {
   it.each`
      path         | pageTestId
      ${"/"}       | ${"home-page"}
      ${"/signup"} | ${"signup-page"}
      ${"/login"}  | ${"login-page"}
      ${"/user/1"} | ${"user-page"}
      ${"/user/2"} | ${"user-page"}
   `("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const page = screen.queryByTestId(pageTestId);
      expect(page).toBeInTheDocument();
   });

   it.each`
      path         | pageTestId
      ${"/"}       | ${"signup-page"}
      ${"/"}       | ${"login-page"}
      ${"/signup"} | ${"home-page"}
      ${"/signup"} | ${"login-page"}
      ${"/user"}   | ${"home-page"}
      ${"/user"}   | ${"signup-page"}
      ${"/user"}   | ${"login-page"}
   `("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
      window.history.pushState({}, "", path);
      render(<App />);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument();
   });
});
