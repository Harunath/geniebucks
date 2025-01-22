import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const date = req.nextUrl?.searchParams.get("date");
	let startOfDay: Date, endOfDay: Date;

	// Default to the current day if no date is provided
	if (date) {
		const d = new Date(date);
		const correctDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		startOfDay = new Date(correctDate.setHours(0, 0, 0, 0)); // Start of the day
		endOfDay = new Date(correctDate.setHours(23, 59, 59, 999)); // End of the day
	} else {
		const d = new Date(); // Today's date
		startOfDay = new Date(d.setHours(0, 0, 0, 0)); // Start of today
		endOfDay = new Date(d.setHours(23, 59, 59, 999)); // End of today
	}
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const { id } = session.user;
	const transactions = await prisma.transaction.findMany({
		where: {
			userId: id,
			date: {
				gte: startOfDay, // Greater than or equal to the start of the day
				lte: endOfDay, // Less than or equal to the end of the day
			},
		},
	});
	return NextResponse.json({ transactions }, { status: 200 });
}
