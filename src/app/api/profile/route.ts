import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	if (!id) {
		return NextResponse.json({ message: "id not found" }, { status: 404 });
	}
	const profile = await prisma.user.findUnique({
		where: { id },
		select: {
			firstname: true,
			lastname: true,
			email: true,
			gender: true,
			profession: true,
		},
	});
	console.log(profile, "profile");
	if (!profile) {
		return NextResponse.json({ message: "User not found" }, { status: 404 });
	}

	return NextResponse.json({ messae: "success", profile }, { status: 200 });
}

export async function POST(request: Request) {
	try {
		const {
			name,
			gender,
			profession,
		}: {
			name: string;
			profession:
				| "Employed"
				| "SelfEmployed"
				| "Business"
				| "Student"
				| "Retired"
				| "Unemployed";
			gender: "Male" | "Female" | "Other" | "PreferNotToSay";
		} = await request.json();
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.redirect(new URL("/api/auth/signin", request.url));
		}
		const { id } = session.user;

		// Filter out undefined values to avoid overwriting fields
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const dataToUpdate: Record<string, any> = {};
		if (name.length > 0) dataToUpdate.name = name;
		if (profession.length > 0) dataToUpdate.profession = profession;
		if (gender.length > 0) dataToUpdate.gender = gender;

		// Only proceed if there's something to update
		if (Object.keys(dataToUpdate).length === 0) {
			return NextResponse.json(
				{ error: "No data provided to update" },
				{ status: 400 }
			);
		}

		const response = await prisma.user.update({
			where: { id },
			data: {},
		});

		return NextResponse.json({ response });
	} catch (err) {
		if (err instanceof Error)
			return NextResponse.json({ err: err.message, status: 500 });
		return NextResponse.json({ err: "Unkown error", status: 500 });
	}
}
