"use client";

import useStore from "@/store/state";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	const dark = useStore((state) => state.dark);
	return (
		<SessionProvider>
			<div className={`${dark ? "dark" : ""}`}>{children}</div>;
		</SessionProvider>
	);
};

export default Providers;
