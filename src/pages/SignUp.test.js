import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";

describe("Sign up page", () => {
   describe("lay out", () => {
      it("has a header", () => {
         render(<SignUpPage />);
         const header = screen.getByRole("heading", { name: "Sign Up" });
         expect(header).toBeInTheDocument();
      });
   });
});
