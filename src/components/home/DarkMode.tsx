"use client";

import { useEffect } from "react";
import useStore from "@/store/state";

export const DarkMode = () => {
	const dark = useStore((state) => state.dark);
	const setDark = useStore((state) => state.setDark);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (stored === "dark" || (!stored && prefersDark)) {
			setDark(true);
			document.documentElement.classList.add("dark");
		} else {
			setDark(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		const nextDark = !dark;
		setDark(nextDark);
		localStorage.setItem("theme", nextDark ? "dark" : "light");
		document.documentElement.classList.toggle("dark", nextDark);
	};

	return (
		<button
			onClick={toggleDarkMode}
			className="px-2 rounded-full w-13 flex items-center justify-start transition duration-300 dark:bg-neutral-200 bg-neutral-800 ">
			<span className="transition dark:translate-x-4 duration-300">
				{dark ? "🌑" : "☀️"}
			</span>
		</button>
	);
};
