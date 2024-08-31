import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
	return <header className="container py-2">
		<div className="flex justify-between items-center flex-col md:flex-row">
			<span className="font-bold">Hunterseek</span>
			<div>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	</header>
}