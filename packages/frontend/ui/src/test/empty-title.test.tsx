import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyTitle } from "../components/data-display/empty";

describe("EmptyTitle", () => {
  it("does not render when children are missing", () => {
    const { container } = render(<EmptyTitle />);
    expect(container.querySelector("h3")).toBeNull();
  });

  it("does not render for empty text content", () => {
    const { container } = render(<EmptyTitle>{"   "}</EmptyTitle>);
    expect(container.querySelector("h3")).toBeNull();
  });

  it("renders as heading for string content", () => {
    render(<EmptyTitle>Nothing here yet</EmptyTitle>);
    expect(screen.getByRole("heading", { level: 3, name: "Nothing here yet" })).toBeInTheDocument();
  });

  it("renders accessible heading when aria-label is provided", () => {
    render(
      <EmptyTitle aria-label="No notifications">
        <span aria-hidden="true">!</span>
      </EmptyTitle>,
    );

    expect(screen.getByRole("heading", { level: 3, name: "No notifications" })).toBeInTheDocument();
  });

  it("renders accessible heading when title is provided without text content", () => {
    render(
      <EmptyTitle title="No results yet">
        <span aria-hidden="true">!</span>
      </EmptyTitle>,
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("title", "No results yet");
  });

  it("keeps className on heading", () => {
    render(<EmptyTitle className="custom-empty-title">Nothing here yet</EmptyTitle>);
    expect(screen.getByRole("heading", { level: 3 })).toHaveClass("custom-empty-title");
  });
});
