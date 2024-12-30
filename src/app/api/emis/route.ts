import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const emiSchema = z.object({
	amount: z.number().positive(),
	to: z.string().nonempty().optional(),
	status: z.enum(["PENDING", "PAID", "OVERDUE"]),
	installmentNumber: z.number().int().optional(),
	totalInstallments: z.number().int().optional(),
	dueDate: z.string(),
	endDate: z.string(),
	date: z.string(),
	notes: z.string().optional(),
	for: z.string().nonempty(),
});

export async function GET(request: Request) {
	try {
		console.log("working1");
		const session = await getServerSession(authOptions);
		console.log("working2");
		if (!session)
			return NextResponse.redirect(new URL("/api/auth/signin", request.url));
		const id = session.user.id;
		console.log("working3");
		const emis = await prisma.emis.findMany({
			where: {
				userId: id,
			},
		});
		console.log("working4");
		console.log(emis);
		if (emis.length) return NextResponse.json({ emis });
		return NextResponse.json({ emis: [] });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return NextResponse.json({ error });
	}
}

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		const body = await request.json();
		const result = emiSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.errors },
				{ status: 400 }
			);
		}

		if (!session || !session.user)
			return NextResponse.redirect(new URL("/api/auth/signin", request.url));

		const id = session.user.id;
		const createEmi = { ...result.data, userId: id };
		const emis = await prisma.emis.create({
			data: createEmi,
		});
		revalidatePath("/emis");
		return NextResponse.json({ emis });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return NextResponse.json({ error });
	}
}
