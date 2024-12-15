"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function Auth() {
	const session = useSession();
	return (
		<div>
			{session?.data?.user ? (
				<button onClick={async () => await signOut()}>Logout</button>
			) : (
				<button onClick={() => signIn()}>Login</button>
			)}
		</div>
	);
}

export default Auth;
