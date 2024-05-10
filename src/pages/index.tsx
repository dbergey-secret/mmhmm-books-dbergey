import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Book, StatusMessage } from "@/lib/types";
import { fetchBooks } from "@/lib/books-api-client";
import styles from "./index.module.scss";
import Link from "next/link";
import { Card } from "@/lib/components/Card";
import React from "react";
import { useRouter } from "next/router";
import { sleep } from "@/lib/sleep";
import ky from "ky";
import { StatusMessageBox } from "@/lib/components/StatusMessageBox";
import Head from "next/head";

export const getServerSideProps = (async () => {
	const books = await fetchBooks();

	if (!books) {
		return {
			props: {
				books: [],
				statusMessage: {
					message: "Sorry, books could not be loaded.",
					success: false,
				},
			},
		};
	}

	return {
		props: {
			books,
		},
	};
}) satisfies GetServerSideProps<{
	books: Book[];
	statusMessage?: StatusMessage;
}>;

export default function Home({
	books,
	statusMessage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [state, setState] = React.useState<StatusMessage | undefined>(
		statusMessage,
	);
	const router = useRouter();

	async function onDeleteClick(id: Book["id"]) {
		console.log({ id });
		const response = await ky
			.post("/api/delete-book", { json: id })
			.json<StatusMessage>();

		setState(response);

		if (response.success) {
			await sleep(2000);
			// clear message
			setState(undefined);
			// reload in place
			router.replace("/");
		}
	}

	return (
		<>
			<Head>
				<title>Bookshelf :: mmhmm</title>
			</Head>
			<main className={styles.main}>
				<header className={styles.header}>
					<h1 className={styles.headerTitle}>Bookshelf</h1>
					<Link href="/add" className={styles.bigGreenButton}>
						Add book
					</Link>
				</header>

				<div>
					{state?.message ? <StatusMessageBox {...state} /> : null}

					{books.length === 0 ? (
						<div className={styles.emptyMessage}>
							Your bookshelf is empty. <Link href="/add">Add a book!</Link>
						</div>
					) : null}

					{books.map((book) => (
						<Card key={book.id} {...{ ...book, onDeleteClick }} />
					))}
				</div>
			</main>
		</>
	);
}
