import { userType } from "@/lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getProfile(): Promise<userType> {
	const session = await getServerSession(authOptions);
	if (!session) {
		throw new Error("Not authenticated");
	}
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/profile`
	);

	if (!response.ok) {
		// throw new Error("Failed to fetch profile");
		console.log(response);
	}

	return response.json();
}
