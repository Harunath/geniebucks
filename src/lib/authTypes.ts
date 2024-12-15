import "next-auth";

declare module "next-auth" {
	interface User {
		id: number;
		email: string; // Explicitly define email as always available
		name?: string;
	}

	interface Session {
		user: User; // Link the extended User type here
	}
}
