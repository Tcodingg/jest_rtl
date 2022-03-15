import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign up page", () => {
   describe("Layout", () => {
      it("has a header", () => {
         render(<SignUpPage />);
         const header = screen.getByRole("heading", { name: "Sign Up" });
         expect(header).toBeInTheDocument();
      });

      it("has username input", () => {
         render(<SignUpPage />);

         const username = screen.getByLabelText("Username");
         expect(username).toBeInTheDocument();
      });
      it("has email input", () => {
         render(<SignUpPage />);
         const email = screen.getByLabelText("E-Mail");
         expect(email).toBeInTheDocument();
      });
      it("has password input", () => {
         render(<SignUpPage />);
         const password = screen.getByLabelText("Password");
         expect(password).toBeInTheDocument();
      });
      it("has password type for the password input", () => {
         render(<SignUpPage />);
         const password = screen.getByLabelText("Password");
         expect(password.type).toBe("password");
      });
      it("has password repeat input", () => {
         render(<SignUpPage />);
         const passwordRepeat = screen.getByLabelText("Password Repeat");
         expect(passwordRepeat).toBeInTheDocument();
      });
      it("has password type for the password repeat input", () => {
         render(<SignUpPage />);
         const passwordRepeat = screen.getByLabelText("Password Repeat");
         expect(passwordRepeat.type).toBe("password");
      });
      it("has a sign up button", () => {
         render(<SignUpPage />);
         const signUpBtn = screen.getByRole("button", { name: "Sign Up" });
         expect(signUpBtn).toBeInTheDocument();
      });
      it("disables the button initially", () => {
         render(<SignUpPage />);
         const signUpBtn = screen.getByRole("button", { name: "Sign Up" });
         expect(signUpBtn).toBeDisabled();
      });
   });

   describe("interactions", () => {
      it("enables the button when the password and password repeat fields have the same values", async () => {
         render(<SignUpPage />);
         const passwordInput = screen.getByLabelText("Password");
         const passwordRepeatInput = screen.getByLabelText("Password Repeat");
         userEvent.type(passwordInput, "P4ssword");
         userEvent.type(passwordRepeatInput, "P4ssword");
         const signUpBtn = await screen.findByRole("button", {
            name: "Sign Up",
         });
         expect(signUpBtn).not.toBeDisabled();
      });
      it("sends email, username, and password after the the sign up button is clicked", async () => {
         // set up the server
         let requestBody;
         const server = setupServer(
            rest.post("/api/1.0/users", (req, res, ctx) => {
               requestBody = req.body;
               return res(ctx.status(200));
            })
         );

         server.listen();

         render(<SignUpPage />);
         const email = screen.getByLabelText("E-Mail");
         const username = screen.getByLabelText("Username");
         const passwordInput = screen.getByLabelText("Password");
         const passwordRepeatInput = screen.getByLabelText("Password Repeat");
         userEvent.type(username, "user1");
         userEvent.type(email, "user1@mail.com");
         userEvent.type(passwordInput, "P4ssword");
         userEvent.type(passwordRepeatInput, "P4ssword");
         const signUpBtn = screen.queryByRole("button", {
            name: "Sign Up",
         });
         userEvent.click(signUpBtn);

         // 1. MOCKING WITH AXIOS

         // const mockFn = jest.fn();
         // axios.post = mockFn;

         // const firstCallOfMockFunction = mockFn.mock.calls[0]; // this means we are calling the first parameter of axios
         // const body = firstCallOfMockFunction[1]; // body is second parameter of axios
         // expect(body).toEqual({
         //    username: "user1",
         //    email: "user1@mail.com",
         //    password: "P4ssword",
         // });

         //2. MOCKING WITH FETCH
         // const mockFn = jest.fn();
         // window.fetch = mockFn;

         // const firstCallOfMockFunction = mockFn.mock.calls[0];
         // const body = JSON.parse(firstCallOfMockFunction[1].body);
         // expect(body).toEqual({
         //    username: "user1",
         //    email: "user1@mail.com",
         //    password: "P4ssword",
         // });

         // 3. MOCKING WITH MSW

         await new Promise((resolve) => setTimeout(resolve, 500));

         expect(requestBody).toEqual({
            username: "user1",
            email: "user1@mail.com",
            password: "P4ssword",
         });
      });
   });
});
