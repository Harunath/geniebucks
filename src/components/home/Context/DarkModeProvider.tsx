// context/DarkModeProvider.tsx
"use client";

import { createContext, useState, useContext, useEffect } from "react";

interface DarkModeContextProps {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
	undefined
);

export const DarkModeProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const storedPreference = localStorage.getItem("theme");
		if (storedPreference === "dark") {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (!context) {
		throw new Error("useDarkMode must be used within a DarkModeProvider");
	}
	return context;
};
