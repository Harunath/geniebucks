// components/DarkModeToggle.tsx
"use client";

import { useDarkMode } from "./Context/DarkModeProvider";

export default function DarkModeToggle() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	return (
		<button
			onClick={toggleDarkMode}
			className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
			{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
		</button>
	);
}
