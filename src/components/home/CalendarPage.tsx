"use client";
import useTransactions from "@/store/hooks/useTransactions";
import { useState, useEffect, useMemo } from "react";

export default function CalendarPages() {
	const today = new Date().toLocaleDateString().split("/");
	// const time = new Date().toLocaleTimeString();
	// time is not set for the transaction
	const [date, setDate] = useState(
		new Date(Number(today[2]), Number(today[0]) - 1, Number(today[1]))
	);
	const getTransactions = useTransactions();

	const memoizedDate = useMemo(() => date, [date]);

	useEffect(() => {
		getTransactions(memoizedDate);
	}, [memoizedDate, getTransactions]);

	return (
		<>
			<div className="w-fit">
				<input
					className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
					type="date"
					onChange={(e) => setDate(new Date(e.target.value))}
					defaultValue={`${date.getFullYear()}-${
						date.getMonth() + 1
					}-${date.getDate()}`}
					id="date"
					name="date"
				/>
			</div>
		</>
	);
}
