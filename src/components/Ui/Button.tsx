"use client";
import React, { useState } from "react";

function Button({
	onClick,
	className = "",
	text,
}: {
	onClick: () => void;
	className?: string;
	text: string;
}) {
	const [loading, setLoading] = useState(false);
	return (
		<button
			onClick={async () => {
				setLoading(true);
				await onClick();
				setLoading(false);
			}}
			className={`
    min-w-20 p-2 rounded-lg ml-auto
    bg-gradient-to-r from-[#2e9900] to-[#31aa3b]
    text-[#ebecf9] font-semibold
    shadow-md shadow-[#31aa3b]/20
    transition-all duration-300 ease-in-out
    hover:shadow-lg hover:shadow-[#31aa3b]/30
    hover:scale-105 hover:brightness-110
    focus:outline-none focus:ring-2 focus:ring-[#89d57b]/50
    active:scale-95
    ${className}
  `}>
			{loading ? (
				<span className="inline-block animate-spin mr-2">&#9696;</span>
			) : null}
			{loading ? "Loading..." : text}
		</button>
	);
}

export default Button;
