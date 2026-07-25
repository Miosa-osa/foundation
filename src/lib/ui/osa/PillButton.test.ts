import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";
import PillButton from "./PillButton.svelte";

describe("PillButton", () => {
  it("reacts when visual props change", async () => {
    const children = createRawSnippet(() => ({
      render: () => "<span>Action</span>",
    }));
    const { rerender } = render(PillButton, {
      variant: "primary",
      size: "sm",
      children,
    });

    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toHaveClass("btn-pill-primary", "btn-pill-sm");

    await rerender({
      variant: "danger",
      size: "lg",
      block: true,
      loading: false,
      children,
    });

    expect(button).toHaveClass(
      "btn-pill-danger",
      "btn-pill-lg",
      "btn-pill-block",
    );
    expect(button).not.toHaveClass("btn-pill-primary", "btn-pill-sm");
  });
});
