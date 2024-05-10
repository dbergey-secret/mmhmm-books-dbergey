import type { NextApiRequest, NextApiResponse } from "next";
import { StatusMessage } from "@/lib/types";
import { deleteBook } from "@/lib/books-api-client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = req.body;
	console.log({ id }, "Deleting book");

	// id is required
	if (!id) {
		console.log({ id }, "Book ID missing.");

		return res.status(200).json({
			success: false,
			message: "Sorry, could not delete unknown book.",
		});
	}

	const response = await deleteBook(id);

	if (!response) {
		// or other error condition TBD
		console.log({ id, response }, "Book API error.");

		res.status(200).json({
			success: false,
			message: "Sorry, something went wrong.",
		});
		return;
	}

	console.log({ id }, "Book successfully deleted.");

	res.status(200).json({
		success: true,
		message: "Successfully deleted!",
	} satisfies StatusMessage);
}
