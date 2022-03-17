import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./SignUpPage";
import { setupServer } from "msw/node";
import { rest } from "msw";

// this is a continuation of SignUp.test.js
describe(" interaction", () => {
   let signUpBtn;
   const setup = () => {
      render(<SignUpPage />);
      const email = screen.getByLabelText("E-Mail");
      const username = screen.getByLabelText("Username");
      const passwordInput = screen.getByLabelText("Password");
      const passwordRepeatInput = screen.getByLabelText("Password Repeat");
      userEvent.type(username, "user1");
      userEvent.type(email, "user1@mail.com");
      userEvent.type(passwordInput, "P4ssword");
      userEvent.type(passwordRepeatInput, "P4ssword");
      signUpBtn = screen.queryByRole("button", {
         name: "Sign Up",
      });
   };

   it("disables button when there is an ongoing api call", async () => {
      // set up the server
      let requestBody;
      let counter = 0;
      const server = setupServer(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            counter++;
            return res(ctx.status(200));
         })
      );

      server.listen();

      setup();
      userEvent.click(signUpBtn);

      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(counter).toBe(1);
   });
   it("displays the spinner while the api request in progress", async () => {
      // set up the server
      let requestBody;
      let counter = 0;
      const server = setupServer(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            counter++;
            return res(ctx.status(200));
         })
      );

      server.listen();

      setup();
      userEvent.click(signUpBtn);
      const spinner = screen.getByRole("status", { hidden: true });
      expect(spinner).toBeInTheDocument();

      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(counter).toBe(1);
   });
   it("does not display the spinner when there is no api request", () => {
      setup();
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument();
   });
   it("displays spinner after clicking the submit button", async () => {
      // set up the server

      const server = setupServer(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            return res(ctx.status(200));
         })
      );

      server.listen();

      setup();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      userEvent.click(signUpBtn);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
   });
   it("displays account activation notification after successful sign up request", async () => {
      // set up the server

      const server = setupServer(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            return res(ctx.status(200));
         })
      );

      server.listen();

      setup();
      let message = "Please check your e-mail to activate your account";
      expect(screen.queryByText(message)).not.toBeInTheDocument();
      userEvent.click(signUpBtn);
      let displayMessage = await screen.findByText(message);

      expect(displayMessage).toBeInTheDocument();
   });
});
