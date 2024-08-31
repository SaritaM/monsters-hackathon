'use client'
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import BountyCard from "./BountyCard";

export default function ViewBounties() {
	const bounties = useQuery(api.bounty.get);
	
	return bounties && <div className="flex flex-col gap-4 w-full">
		{bounties.map(bounty => <BountyCard key={bounty._id} bounty={bounty} />)}
	</div>
}