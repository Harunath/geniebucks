import NextAuth, { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
	providers: [
		// Gmail Authentication
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", required: true },
				password: { label: "Password", type: "password", required: true },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid email or password");
				}
				const user = await prisma.user.findFirst({
					where: { email: credentials.email },
					select: {
						id: true,
						email: true,
						password: true,
						firstname: true,
						lastname: true,
					},
				});
				if (user) {
					// Verify password
					const isValidPassword = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (!isValidPassword) {
						throw new Error("Invalid password");
					}
					return {
						id: user.id,
						email: user.email,
						firstname: user.firstname,
						lastname: user.lastname ? user.lastname : "",
					};
				}
				return null;
			},
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
				return false;
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
				token.email = res?.email;
				token.firstname = res?.firstname;
				token.lastname = res?.lastname;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user && token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.firstname = token.firstname as string;
				session.user.lastname = token.lastname as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
	secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
