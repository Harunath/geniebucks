import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs"; // For password hashing
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const { email, firstname, lastname, phone, password } = await req.json();
		// Basic input validation
		if (!email || !password || !lastname || !phone) {
			return NextResponse.json(
				{ error: "Please provide all required fields." },
				{ status: 400 }
			);
		}

		// Check if the user with the given email already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists." },
				{ status: 409 }
			); // Conflict status
		}

		// Hash the password before saving it
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user in the database
		const newUser = await prisma.user.create({
			data: {
				email,
				emailVerified: true,
				firstname,
				lastname,
				phone,
				password: hashedPassword,
			},
			select: {
				id: true,
				email: true,
				firstname: true,
				lastname: true,
				phone: true,
				gender: true,
				createdAt: true,
				updatedAt: true,
			},
		});
		if (newUser)
			// Respond with the new ly created user (without the password for security)
			return NextResponse.json(
				{ message: "success", user: newUser },
				{ status: 201 }
			); // Created status
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Something went wrong during registration." },
			{ status: 500 }
		); // Internal Server Error
	} finally {
		await prisma.$disconnect();
	}
}
