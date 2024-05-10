export const getBooksApiBaseUrl = (): string => {
	return process.env.BOOKS_API_BASE_URL as string;
};

export const getBooksApiSecret = (): string => {
	return process.env.BOOKS_API_SECRET as string;
};
