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
		const t = new Date(date).toLocaleTimeString();
		return t;
	};
	return (
		<div className="w-96 flex flex-col gap-1">
			{transactionList.length > 0 &&
				transactionList.map((item, index) => (
					<div
						key={index}
						className="flex gap-x-2 bg-yellow-200 dark:bg-neutral-800  dark:text-neutral-300 rounded p-2">
						<div>
							{item.type == "income" ? (
								<p className=" w-20 text-xl font-semibold text-green-400">
									Income
								</p>
							) : (
								<p className=" w-20 text-xl font-semibold text-red-600">
									Expense
								</p>
							)}
						</div>
						<p className="">Amount : {item.amount}</p>
						<p>{GetDate(item.date)}</p>
						{item.description.length > 0 && (
							<p>Description : {item.description}</p>
						)}
					</div>
				))}
		</div>
	);
};

export default List;
