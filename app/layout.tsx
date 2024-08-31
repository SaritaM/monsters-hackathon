import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from './ConvexClientProvider';
import Header from '@/components/Header';

const inter = Inter({ 
	subsets: ["latin"],
	display: "swap",
	variable: '--body-font'
});

export const metadata: Metadata = {
  title: "Hunterseek",
  description: "Taking care of your little monster problem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
			<ConvexClientProvider>
				<html lang="en" className={inter.variable}>
					<body>
						<Header />
						{children}
					</body>
				</html>
			</ConvexClientProvider>
    </ClerkProvider>
  )
}
