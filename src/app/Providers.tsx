"use client";

import useStore from "@/store/state";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	const dark = useStore((state) => state.dark);
	return <div className={`${dark ? "dark" : ""}`}>{children}</div>;
};

export default Providers;
