import { sleep } from "@/lib/sleep";
import { StatusMessage } from "@/lib/types";
import ky from "ky";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useActionState } from "react";
import styles from "./add.module.scss";
import { StatusMessageBox } from "@/lib/components/StatusMessageBox";
import Head from "next/head";

export default function AddBook() {
	const [state, setState] = React.useState<StatusMessage>();
	const router = useRouter();

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newBookProps = Object.fromEntries(formData);
		const response = await ky
			.post("/api/add-book", { json: newBookProps })
			.json<StatusMessage>();

		setState(response);

		if (response.success) {
			await sleep(2000);
			router.push("/");
		}
	}

	return (
		<>
			<Head>
				<title>Add Book :: mmhmm</title>
			</Head>

			<main className={styles.main}>
				<header className={styles.header}>
					<h1 className={styles.headerTitle}>Add a new book</h1>
					<Link href="/" className={styles.closeButton}>
						&times;
					</Link>
				</header>

				{state?.message ? <StatusMessageBox {...state} /> : null}

				<form className={styles.form} onSubmit={onSubmit}>
					<label className={styles.label} htmlFor="title">
						Title
					</label>
					<input
						className={styles.input}
						id="title"
						name="title"
						required
						autoFocus
					/>
					<label className={styles.label} htmlFor="author">
						Author
					</label>
					<input className={styles.input} id="author" name="author" required />
					<label className={styles.label} htmlFor="description">
						Description
					</label>
					<textarea
						className={styles.textarea}
						id="description"
						name="description"
						required
					/>
					<label className={styles.label} htmlFor="imageUrl">
						Image URL
					</label>
					<input
						className={styles.input}
						id="imageUrl"
						name="imageUrl"
						required
					/>
					<div className={styles.buttonArea}>
						<button
							type="submit"
							className={styles.bigGreenButton}
							id="saveButton"
						>
							Save
						</button>
					</div>
				</form>
			</main>
		</>
	);
}
