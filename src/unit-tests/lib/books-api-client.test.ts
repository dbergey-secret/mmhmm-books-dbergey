import { describe, it, expect, vi } from "vitest";

import { fetchBooks, addBook, deleteBook } from "@/lib/books-api-client";
import { Book, FetchBooksApiResponse } from "@/lib/types";
import { getBooksApiBaseUrl, getBooksApiSecret } from "@/lib/env";
import ky, { ResponsePromise } from "ky-universal";
import { mockBooks, mockImageUrl } from "../mocks";

vi.mock("ky-universal");
vi.mock("@/lib/env", async () => ({
	getBooksApiBaseUrl: () => "https://example.com/",
	getBooksApiSecret: () => "supersecret",
}));

const mockKy = vi.mocked(ky);

describe("Books API Client", () => {
	it("fetches all books", async () => {
		mockKy.mockReturnValueOnce({
			json: async () => mockBooks,
		} as ResponsePromise);

		const result = await fetchBooks();

		expect(mockKy).toHaveBeenLastCalledWith(
			"books",
			expect.objectContaining({
				method: "get",
			}),
		);
	});

	it("adds a book", async () => {
		mockKy.mockReturnValueOnce({
			json: async () => mockBooks,
		} as ResponsePromise);

		const result = await addBook({
			author: "Elaine Benes",
			title: "Catalogued: The J. Peterman Story",
			imageUrl: mockImageUrl,
			description: mockBooks[1].description,
		});

		expect(mockKy).toHaveBeenLastCalledWith(
			"books",
			expect.objectContaining({
				method: "post",
				json: {
					title: mockBooks[1].title,
					imageUrl: mockImageUrl,
					author: mockBooks[1].author,
					description: mockBooks[1].description,
				},
			}),
		);
	});

	it("deletes a book", async () => {
		mockKy.mockReturnValueOnce({
			json: async () => mockBooks,
		} as ResponsePromise);

		const result = await deleteBook("1000");

		expect(mockKy).toHaveBeenLastCalledWith(
			"books/1000",
			expect.objectContaining({ method: "delete" }),
		);
	});
});
