export type Book = {
	id: string;
	description: string;
	imageUrl: string;
	author: string;
	title: string;
};

export type StatusMessage = {
	message: string;
	success: boolean;
};

export type FetchBooksApiRequest = undefined;
export type FetchBooksApiResponse = Book[];
export type AddBookApiRequest = Omit<Book, "id">;
export type AddBookApiResponse = Book[];
export type DeleteBookApiRequest = Book["id"];
export type DeleteBookApiResponse = Book[];
