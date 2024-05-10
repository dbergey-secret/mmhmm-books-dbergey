import ky from "ky-universal";
import { getBooksApiBaseUrl, getBooksApiSecret } from "./env";
import type {
	AddBookApiRequest,
	AddBookApiResponse,
	DeleteBookApiRequest,
	DeleteBookApiResponse,
	FetchBooksApiResponse,
} from "./types";

export async function fetchBooks(): Promise<FetchBooksApiResponse | null> {
	const response = await ky("books", {
		method: "get",
		prefixUrl: getBooksApiBaseUrl(),
		headers: {
			Authorization: getBooksApiSecret(),
		},
	}).json<FetchBooksApiResponse>();

	if (!response) {
		console.log({ response }, "Failed to fetch books from API.");
		return null;
	}

	console.log(
		{ responseLength: response.length },
		"Successfully fetched books from API.",
	);

	return response;
}

export async function addBook(
	data: AddBookApiRequest,
): Promise<AddBookApiResponse | null> {
	const response = await ky("books", {
		json: data,
		method: "post",
		prefixUrl: getBooksApiBaseUrl(),
		headers: {
			Authorization: getBooksApiSecret(),
		},
	}).json<AddBookApiResponse>();

	if (!response) {
		console.log({ response }, "Failed to add book via API.");
		return null;
	}

	console.log({ data }, "Successfully added book via API.");

	return response;
}

export async function deleteBook(
	id: DeleteBookApiRequest,
): Promise<DeleteBookApiResponse | null> {
	const response = await ky(`books/${id}`, {
		method: "delete",
		prefixUrl: getBooksApiBaseUrl(),
		headers: {
			Authorization: getBooksApiSecret(),
		},
	}).json<DeleteBookApiResponse>();

	if (!response) {
		console.log({ response }, "Failed to delete book via API.");
		return null;
	}

	console.log({ id }, "Successfully deleted book via API.");

	return response;
}
