"use client";

// import useStore from "@/store/state";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
	// const dark = useStore((state) => state.dark);
	return (
		<SessionProvider>
			<ToastContainer />
			{/* <div className={`${dark ? "dark" : ""}`}> */}

			<div>{children}</div>

			{/* </div>; */}
		</SessionProvider>
	);
};

export default Providers;
