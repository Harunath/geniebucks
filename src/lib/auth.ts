import NextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		// Gmail Authentication
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			// Check if user already exists in the database
			const existingUser = await prisma.user.findUnique({
				where: {
					email: user.email!,
				},
			});

			// If user doesn't exist, create a new record
			if (!existingUser) {
				await prisma.user.create({
					data: {
						email: user.email!,
						name: user?.name || "Unnamed",
					},
				});
			}

			return true; // Returning true allows the sign-in process to continue
		},
		async jwt({ token, user }) {
			// Add user information to the token
			if (user && user.email) {
				const res = await prisma.user.findFirst({
					where: {
						email: user.email,
					},
				});
				token.id = res?.id;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user && token) {
				session.user.id = token.id as number;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
