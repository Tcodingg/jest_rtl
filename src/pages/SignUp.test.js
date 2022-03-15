import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

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
      it("sends email, username, and password after the the button is clicked", async () => {
         render(<SignUpPage />);
         const email = screen.getByLabelText("E-Mail");
         const username = screen.getByLabelText("Username");
         const passwordInput = screen.getByLabelText("Password");
         const passwordRepeatInput = screen.getByLabelText("Password Repeat");
         userEvent.type(username, "user1");
         userEvent.type(email, "user1@mail.com");
         userEvent.type(passwordInput, "P4ssword");
         userEvent.type(passwordRepeatInput, "P4ssword");
         const signUpBtn = await screen.findByRole("button", {
            name: "Sign Up",
         });
         const mockFn = jest.fn();
         axios.post = mockFn;

         userEvent.click(signUpBtn);
         const firstCallOfMockFunction = mockFn.mock.calls[0];
         const body = firstCallOfMockFunction[1];
         expect(body).toEqual({
            username: "user1",
            email: "user1@mail.com",
            password: "P4ssword",
         });
      });
   });
});
