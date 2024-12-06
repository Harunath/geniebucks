import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
	providers: [
		// Gmail Authentication
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),

		// Email Authentication
		// EmailProvider({
		// 	server: {
		// 		host: process.env.EMAIL_SERVER_HOST!,
		// 		port: Number(process.env.EMAIL_SERVER_PORT!),
		// 		auth: {
		// 			user: process.env.EMAIL_SERVER_USER!,
		// 			pass: process.env.EMAIL_SERVER_PASSWORD!,
		// 		},
		// 	},
		// 	from: process.env.EMAIL_FROM!,
		// }),
	],
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async session({ session, token, user }) {
			// Attach additional fields to the session if needed
			if (token) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				session.user.id = token.id as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			// Add user information to the token
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
