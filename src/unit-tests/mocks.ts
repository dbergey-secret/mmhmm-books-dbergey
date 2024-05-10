import { Book } from "@/lib/types";

export const mockImageUrl = "https://picsum.photos/125/200";

export const mockBooks = [
	{
		id: "1000",
		title: "The Yankees & Me",
		author: "George Costanza",
		imageUrl: mockImageUrl + "?1000",
		description:
			"In this uproarious tale, George Costanza, a bumbling office worker, stumbles into an unexpected gig with the New York Yankees. As he navigates the world of baseball, hilarity ensues: think foul balls ricocheting off his coffee cup, dugout mishaps, and a mascot that moonlights as a salsa dancer. With a dash of slapstick and a pinch of absurdity, “The Yankees & Me” promises a home run of laughter!",
	},
	{
		id: "2000",
		author: "Elaine Benes",
		imageUrl: mockImageUrl + "?2000",
		title: "Catalogued: The J. Peterman Story",
		description:
			"Elaine Benes, the intrepid copywriter at J. Peterman, embarks on a quest to capture the essence of each eccentric garment in the catalog. From whispering safari jackets to moonlit bohemian scarves, her prose weaves tales of adventure, love, and absurdity. But when a fedora description accidentally includes a chicken soup recipe, chaos ensues. A whimsical tale of style awaits!",
	},
] as Book[];
