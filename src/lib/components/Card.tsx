import type { Book } from "@/lib/types";
import React from "react";
import styles from "./Card.module.scss";

export const Card = ({
	id,
	author,
	description,
	title,
	imageUrl,
	onDeleteClick,
}: Book & { onDeleteClick: (id: Book["id"]) => void }) => {
	return (
		<div className={styles.root}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				className={styles.cover}
				src={imageUrl}
				height={200}
				width={125}
				alt="Book cover"
			/>
			<div className={styles.info}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.author} rel="author" role="contentinfo">
					{author}
				</div>
				<p className={styles.description}>{description}</p>
			</div>
			<div className={styles.controls}>
				<button
					type="button"
					className={styles.deleteButton}
					onClick={(event) => {
						event.preventDefault();
						onDeleteClick(id);
					}}
				>
					🗑️
				</button>
			</div>
		</div>
	);
};
