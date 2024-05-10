import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { getBooksApiBaseUrl, getBooksApiSecret } from "@/lib/env";

describe("env", () => {
	let oldEnv: NodeJS.ProcessEnv;
	beforeEach(() => {
		oldEnv = process.env;
		process.env = {
			...process.env,
			BOOKS_API_BASE_URL: "https://example.com",
			BOOKS_API_SECRET: "supersecret",
		};
	});

	afterEach(() => {
		process.env = oldEnv;
	});

	it("getBooksApiBaseUrl", () => {
		expect(getBooksApiBaseUrl()).toBe("https://example.com");
	});

	it("getBooksApiSecret", () => {
		expect(getBooksApiSecret()).toBe("supersecret");
	});
});
