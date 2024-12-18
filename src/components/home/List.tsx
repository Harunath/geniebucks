"use client";
import useStore from "@/store/state";
import useTransactions from "@/store/hooks/useTransactions";
import { useEffect } from "react";

const List = () => {
	const transactionsList = useStore((state) => state.transactions);
	const getTransactions = useTransactions();
	console.log("list");
	useEffect(() => {
		getTransactions(new Date());
	}, []);

	const GetDate = (date: Date) => {
		const t = new Date(date).toLocaleTimeString();
		return t.slice(0, t.length - 6) + " " + t.slice(t.length - 2, t.length);
	};

	return (
		<div className="w-96 max-h-80 overflow-y-auto flex flex-col p-4 bg-old_lace-500 dark:bg-ebony-300 text-ebony-400 dark:text-old_lace-400 rounded">
			{transactionsList && transactionsList.length && (
				<div>
					<div className="grid grid-rows-1 grid-cols-4 justify-items-start gap-x-4 p-2">
						<p>Type</p>
						<p>Amount</p>
						<p>Time</p>
						<p>Desc</p>
					</div>
					{transactionsList &&
						transactionsList.map((item, index) => (
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
								<p>
									{item.description && item?.description.length > 0 ? "1" : "0"}
								</p>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default List;
