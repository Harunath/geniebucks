"use client";

import useStore from "@/store/state";
import { useEffect } from "react";

export const DarkMode = () => {
	const dark = useStore((state) => state.dark);
	const setDark = useStore((state) => state.setDark);

	useEffect(() => {
		const storedPreference = localStorage.getItem("theme");
		if (storedPreference === "dark") {
			setDark(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		setDark(!dark);
		if (dark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	return (
		<button
			className="dark:bg-old_lace bg-ebony-100 px-2 rounded-full transition duration-500"
			onClick={toggleDarkMode}>
			<p className=" transition dark:translate-x-2 -translate-x-2 duration-500">
				{dark ? "🌑" : "☀️"}
			</p>
		</button>
	);
};
