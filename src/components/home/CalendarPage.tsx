"use client";
import useTransactions from "@/store/hooks/useTransactions";
import { useState } from "react";

const today = new Date();

export default function CalendarPages() {
	const [date, setDate] = useState(new Date());
	const getTransactions = useTransactions();
	getTransactions(date);
	return (
		<>
			<div className=" ml-auto">
				<input
					className="bg-old_lace-500 dark:bg-night-500"
					type="date"
					onChange={(e) => setDate(new Date(e.target.value))}
					defaultValue={`${today.getFullYear()}-${
						today.getMonth() + 1
					}-${today.getDate()}`}
					id="date"
					name="date"
				/>
			</div>
		</>
	);
}
