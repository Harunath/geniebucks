import Navbar from "@/components/NavBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const links = [
	{
		text: "Home",
		link: "/",
	},
	{
		text: "Profile",
		link: "/profile",
	},
	{
		text: "EMI's",
		link: "/emis",
	},
	{
		text: "analytics",
		link: "/day",
	},
];

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	console.log(session, "session");

	if (!session || !session.user?.id) {
		redirect("/login");
	}

	return (
		<div>
			<Navbar links={links} />
			{children}
		</div>
	);
}
// app/layout.tsx (or the directory containing your layout.tsx)
import React from "react";
