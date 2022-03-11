import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";

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
   });
});
