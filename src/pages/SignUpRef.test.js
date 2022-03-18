import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./SignUpPage";
import { setupServer } from "msw/node";
import { rest } from "msw";

// this is a continuation of SignUp.test.js
describe("interaction", () => {
   let signUpBtn;
   let requestBody;
   let counter;
   const server = setupServer(
      rest.post("/api/1.0/users", (req, res, ctx) => {
         counter++;
         return res(ctx.status(200));
      })
   );
   beforeAll(() => server.listen());
   afterAll(() => server.close());
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

   beforeEach(() => {
      counter = 0;

      server.resetHandlers(); // this resets the server status
   });

   it("disables button when there is an ongoing api call", async () => {
      // set up the server

      setup();
      userEvent.click(signUpBtn);

      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(counter).toBe(1);
   });
   it("displays the spinner while the api request in progress", async () => {
      // set up the server

      setup();
      userEvent.click(signUpBtn);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
   });
   it("does not display the spinner when there is no api request", () => {
      setup();
      const spinner = screen.queryByRole("status");
      expect(spinner).not.toBeInTheDocument();
   });
   it("displays spinner after clicking the submit button", async () => {
      setup();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();

      userEvent.click(signUpBtn);

      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      await screen.findByText(
         "Please check your e-mail to activate your account"
      );
   });
   it("displays account activation notification after successful sign up request", async () => {
      setup();
      let message = "Please check your e-mail to activate your account";
      expect(screen.queryByText(message)).not.toBeInTheDocument();
      userEvent.click(signUpBtn);
      let displayMessage = await screen.findByText(message);

      expect(displayMessage).toBeInTheDocument();
   });
   it("hides the form after a successful signup request", async () => {
      setup();
      const form = screen.getByTestId("form-signup");
      userEvent.click(signUpBtn);
      await waitFor(() => {
         expect(form).not.toBeInTheDocument();
      });
   });

   it("displays validation message for username", async () => {
      server.use(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            counter++;
            return res(
               ctx.status(400),
               ctx.json({
                  validationErrors: {
                     username: "Username can not be null",
                  },
               })
            );
         })
      );
      setup();
      userEvent.click(signUpBtn);
      const validationError = await screen.findByText(
         "Username can not be null"
      );
      expect(validationError).toBeInTheDocument();
   });

   it("hides the spinner and enables the button after response received", async () => {
      //note: if you change your server status, it will be remain for the rest of the test
      // to modify the server for a single test set the response to "res.once"
      // or reset the server.handlers() beforeEach request
      server.use(
         rest.post("/api/1.0/users", (req, res, ctx) => {
            counter++;
            return res(
               ctx.status(400),
               ctx.json({
                  validationErrors: {
                     username: "Username can not be null",
                  },
               })
            );
         })
      );
      setup();
      userEvent.click(signUpBtn);

      const validationError = await screen.findByText(
         "Username can not be null"
      );

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(validationError).toBeInTheDocument();
   });
});
