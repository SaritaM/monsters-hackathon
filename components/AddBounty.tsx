'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import AddBountyForm from "./AddBountyForm";
import { Button } from "./ui/button";

export default function AddBounty(){
	const [open, setOpen] = useState<boolean>();

	return <Dialog
		open={open}
		onOpenChange={setOpen}
	>
		<DialogTrigger><Button asChild><span>Add Bounty</span></Button></DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add a Bounty</DialogTitle>
				<DialogDescription>You are legally entitled to pay the bounty upon completion, or the hunter is legally entitled to take payment in another form. (Pay the hunters)</DialogDescription>
			</DialogHeader>
			<AddBountyForm
				onSuccess={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			/>
		</DialogContent>
	</Dialog>
}