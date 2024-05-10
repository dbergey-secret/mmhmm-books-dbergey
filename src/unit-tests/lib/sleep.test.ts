import { sleep } from "@/lib/sleep";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("sleep", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it.skip("resolves after $n ms", () => {
		const doNextThing = vi.fn();

		(async () => {
			await sleep(1000);
			doNextThing();
		})();

		vi.advanceTimersByTime(2000);

		expect(doNextThing).toHaveBeenCalled();
	});

	it("does NOT resolve before $n ms", async () => {
		const doNextThing = vi.fn();

		sleep(1000).then(() => {
			doNextThing();
		});

		vi.advanceTimersByTime(500);

		expect(doNextThing).not.toHaveBeenCalled();
	});
});
