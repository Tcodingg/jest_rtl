import { render, screen } from "@testing-library/react";

import App from "./App";

describe("routing", () => {
   const setup = (path) => {
      window.history.pushState({}, "", path);
      render(<App />);
   };
   it.each`
      path         | pageTestId
      ${"/"}       | ${"home-page"}
      ${"/signup"} | ${"signup-page"}
      ${"/login"}  | ${"login-page"}
      ${"/user/1"} | ${"user-page"}
      ${"/user/2"} | ${"user-page"}
   `("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
      setup(path);
      const page = screen.queryByTestId(pageTestId);
      expect(page).toBeInTheDocument();
   });

   it.each`
      path         | pageTestId
      ${"/"}       | ${"signup-page"}
      ${"/"}       | ${"login-page"}
      ${"/signup"} | ${"home-page"}
      ${"/signup"} | ${"login-page"}
      ${"/user/1"} | ${"home-page"}
      ${"/user/1"} | ${"signup-page"}
      ${"/user/1"} | ${"login-page"}
   `("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
      setup(path);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument();
   });

   it.each`
      targetPage
      ${"Home"}
      ${"Sign Up"}
   `("has link to $targetPage on Nav", ({ targetPage }) => {
      setup("/");
      const link = screen.getByRole("link", { name: targetPage });
      expect(link).toBeInTheDocument();
   });
});
