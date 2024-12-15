import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
	const prisma = new PrismaClient();
	console.log(" working");
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const { id } = session.user;

	const response = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return NextResponse.json({ response });
}
