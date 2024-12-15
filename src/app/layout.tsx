import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Providers from "./Providers";

export const metadata: Metadata = {
	title: "GenieBucks",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<div className=" h-screen w-screen text-ebony-100 bg-pearl-700 dark:bg-night-200 dark:text-old_lace transition duration-500">
						<div className=" w-full sm:w-[calc(80%)] lg:w-[calc(60%)] h-full mx-auto">
							<Navbar />
							{children}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
