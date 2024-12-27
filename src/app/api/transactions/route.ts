import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
	const date = req.nextUrl?.searchParams.get("date");
	let startOfDay: Date, endOfDay: Date;

	// Default to the current day if no date is provided
	if (date) {
		const d = new Date(date);
		const correctDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		console.log(d, "without correction");
		console.log(correctDate, "with correction");
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
	console.log(startOfDay, "start date");
	console.log(endOfDay, "endof the day");
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

type transaction = {
	amount: number;
	type: string;
	source: string;
	description: string;
	date: Date;
};

export async function POST(req: Request) {
	const {
		amount,
		type,
		source,
		description = "",
		date = new Date(),
	}: transaction = await req.json();
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const { id } = session.user;

	const transactions = await prisma.transaction.create({
		data: {
			userId: id,
			amount,
			type,
			source,
			description,
			date,
		},
	});
	return NextResponse.json({ transactions }, { status: 200 });
}
