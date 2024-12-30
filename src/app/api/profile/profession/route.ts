import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const { profession } = await req.json();
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			redirect("/api/auth/signin");
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
