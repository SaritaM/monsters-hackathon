import { BountyObject } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function BountyCard({bounty}: {
	bounty: BountyObject
}) {
	const title = (): string => {
		switch (bounty.monster) {
			case 'swamp':
				return 'Swamp Thing';
			case 'wraith':
				return 'Wicked Wraith';
			case 'banshee':
				return 'Wild Banshee';
			case 'chimera':
				return 'Fierce Chimera'
			default:
				return 'Unknown Monster'
		}
	}
	return <Card className="w-full max-w-screen-md m-auto">
		<CardHeader>
			<CardTitle>{title()} Spotted!</CardTitle>
		</CardHeader>
		<CardContent className="flex flex-col gap-4">
			<p>A {title()} has been spotted in {bounty.location}</p>
			<span className="text-xl font-bold">${bounty.reward} Reward</span>
		</CardContent>
	</Card>
}