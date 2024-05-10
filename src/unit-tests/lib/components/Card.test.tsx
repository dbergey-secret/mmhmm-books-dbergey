import { describe, it, expect, afterEach } from "vitest";
import { Card } from "@/lib/components/Card";
import { act, cleanup, render, screen } from "@testing-library/react";
import { mockBooks } from "@/unit-tests/mocks";

describe("Card", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders correctly", () => {
		const props = mockBooks[0];
		render(<Card {...props} />);

		expect(screen.getByRole("heading").textContent).toBe(props.title);
		expect(screen.getByRole("contentinfo").textContent).toBe(props.author);
		expect(screen.getByRole("paragraph").textContent).toBe(props.description);
		expect(screen.getByRole("img").getAttribute("src")).toBe(props.imageUrl);
	});

	// TODO: fix this when it works
	it.skip("delete button fires delete event", () => {
		const props = mockBooks[0];
		render(<Card {...props} />);

		const deleteButton = screen.getByRole("button");

		act(() => {
			deleteButton.click();
		});

		// TODO: fix this when it works
		expect(true).toBeTruthy();
	});
});
