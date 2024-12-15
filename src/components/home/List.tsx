"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type transactionType = {
	id: number;
	amount: number;
	type: string;
	description: string;
	date: Date;
};
const List = () => {
	const [transactionList, setTransactionList] = useState<transactionType[]>([]);
	const getTransactions = async () => {
		const response = await axios.get("/api/transactions");
		console.log(response.data);
		setTransactionList(response.data.transactions);
	};
	useEffect(() => {
		getTransactions();
	}, []);
	const GetDate = (date: Date) => {
		const t = new Date(date).toLocaleTimeString().split(" ");
		return t[0].slice(2) + " " + t[1];
	};

	return (
		<div className="w-96 flex flex-col p-4 bg-old_lace-500 dark:bg-ebony-300 text-ebony-400 dark:text-old_lace-400 rounded overflow-hidden">
			{transactionList.length && (
				<div className="grid grid-rows-1 grid-cols-4 justify-items-start gap-x-4 p-2">
					<p>Type</p>
					<p>Amount</p>
					<p>Time</p>
					<p>Desc</p>
				</div>
			)}
			{transactionList.length > 0 &&
				transactionList.map((item, index) => (
					<div
						key={index}
						className="grid grid-rows-1 grid-cols-4 justify-items-start gap-x-4  border-b border-b-african_violet-300 p-1">
						<div>
							{item.type == "income" ? (
								<p className=" w-20 font-semibold text-asparagus">In</p>
							) : (
								<p className=" w-20 font-semibold text-folly">Out</p>
							)}
						</div>
						<p className="">{item.amount}</p>
						<p>{GetDate(item.date)}</p>
						<p>{item.description.length > 0 ? "1" : "0"}</p>
						{/* {item.description.length > 0 && (
							<p>Description : {item.description}</p>
						)} */}
					</div>
				))}
		</div>
	);
};

export default List;
