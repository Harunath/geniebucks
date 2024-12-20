import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";
const prisma = new PrismaClient();

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

export async function GET() {
	try {
		console.log("working1");
		const session = await getServerSession(authOptions);
		console.log("working2");
		if (!session) redirect("/api/auth/signin");
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

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		const body = await req.json();
		const result = emiSchema.safeParse(body);
		if (!result.success) {
			return NextResponse.json(
				{ error: "Invalid input", details: result.error.errors },
				{ status: 400 }
			);
		}

		if (!session || !session.user) redirect("/api/auth/signin");

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
