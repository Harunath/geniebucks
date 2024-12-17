import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const { id } = session.user;

	const transactions = await prisma.transaction.findMany({
		where: {
			userId: id,
		},
	});
	console.log(transactions);
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
	console.log(source);
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
