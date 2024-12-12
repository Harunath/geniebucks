"use client";

import { DarkModeProvider } from "@/components/home/Context/DarkModeProvider";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<DarkModeProvider>{children}</DarkModeProvider>
		</div>
	);
};

export default Providers;
