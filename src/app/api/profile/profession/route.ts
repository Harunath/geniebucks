import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
	const { profession } = await request.json();
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.redirect(new URL("/api/auth/signin", request.url));
		}
		const userId = session?.user.id;

		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				profession,
			},
		});
		return NextResponse.json({ user, status: 200 });
	} catch (err) {
		return NextResponse.json({ err, status: 500 });
	}
}
