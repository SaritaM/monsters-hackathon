import { Id } from "@/convex/_generated/dataModel";

export interface BountyObject {
	_id: Id<"bounty">;
	_creationTime: number;
	monster: string;
	location: string;
	dateSpotted: string;
	reward: number;
	witness: Id<"users">;
	open: boolean;
}