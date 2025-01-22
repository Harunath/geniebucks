import Link from "next/link";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full h-full">
			<div className="flex gap-2">
				<Link href="/day">Day</Link>
				<Link href="/month">Month</Link>
				<Link href="/year">Year</Link>
			</div>
			{children}
		</div>
	);
}

export default layout;
