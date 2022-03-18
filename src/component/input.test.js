import { render, screen } from "@testing-library/react";
import Input from "./Input";

it("has is-invalid class for input when the help is set", () => {
   const { container } = render(<Input help="Error message" />);
   const input = container.querySelector("input");
   expect(input.classList).toContain("is-invalid");
});
it("has is-invalid feedback for input when the help is not set", () => {
   const { container } = render(<Input help="Error message" />);
   const input = container.querySelector("span");
   expect(input.classList).toContain("invalid-feedback");
});

it("does not have is-invalid class for input when the help is not set", () => {
   const { container } = render(<Input />);
   const input = container.querySelector("input");
   expect(input.classList).not.toContain("is-invalid");
});
