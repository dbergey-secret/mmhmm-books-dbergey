import type { StatusMessage } from "@/lib/types";
import styles from "./StatusMessageBox.module.scss";

export const StatusMessageBox = ({ success, message }: StatusMessage) => {
	return message ? (
		<div
			className={`${styles.statusMessageBox} ${success ? styles.statusMessageBoxSuccess : styles.statusMessageBoxError}`}
		>
			<span className={styles.emojicon}>{success ? "✅" : "💔"}</span>
			{message}
		</div>
	) : null;
};
