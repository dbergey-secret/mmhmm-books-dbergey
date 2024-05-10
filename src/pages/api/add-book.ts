import type { NextApiRequest, NextApiResponse } from "next";
import { StatusMessage } from "@/lib/types";
import { addBook } from "@/lib/books-api-client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const book = req.body;
	console.log({ book }, "Adding book");

	// all properties required
	if (!book.title || !book.author || !book.description || !book.imageUrl) {
		console.log({ book }, "Missing required book properties.");

		return res.status(200).json({
			success: false,
			message: "One or more field values are missing.",
		});
	}

	const response = await addBook(book);

	if (!response) {
		// or other error condition TBD
		console.log({ book, response }, "Book API error.");

		res.status(200).json({
			success: false,
			message: "Sorry, something went wrong.",
		});
		return;
	}

	console.log({ book }, "Book successfully added.");

	res.status(200).json({
		success: true,
		message: "Successfully added!",
	} satisfies StatusMessage);
}
