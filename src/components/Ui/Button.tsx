"use client";
import React, { useState } from "react";

function Button({
	onClick,
	classes = "",
	text,
}: {
	onClick: () => void;
	classes?: string;
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
			className={`min-w-20 p-2 rounded ml-auto bg-african_violet-300 text-puce-800 ${classes}`}>
			{loading ? "loading..." : text}
		</button>
	);
}

export default Button;
