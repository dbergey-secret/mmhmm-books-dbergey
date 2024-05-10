export async function sleep(seconds: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, seconds);
	});
}
