'use client'
import AddBounty from "@/components/AddBounty";
import ViewBounties from "@/components/ViewBounties";
import { api } from "@/convex/_generated/api";
import { useStoreUserEffect } from "@/lib/useStoreUserEffect";
import { useQuery } from "convex/react"

export default function Home() {
	const tasks = useQuery(api.tasks.get);
	const { isLoading, isAuthenticated } = useStoreUserEffect();

  return <main className="container flex flex-col gap-8 items-center">
		{isLoading ? <span>Loading...</span> : <>
			{isAuthenticated && <AddBounty />}
			<h1>Hunterseek</h1>
			<ViewBounties />
		</>}
	</main>
}
