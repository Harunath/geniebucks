import { transactionTypes, TransactTypes } from "@/lib/types";
import React from "react";

function Totals({ transactions }: { transactions: transactionTypes[] | null }) {
	let dailySpent = 0;
	let dailyAdd = 0;
	if (transactions)
		transactions.forEach((t) => {
			if (t.type === TransactTypes.income) dailyAdd += t.amount;
			else dailySpent += t.amount;
		});
	return (
		<div className="flex">
			<p className="grow">Totals Spent : {dailySpent}</p>
			<p className="w-1/2">Totals Added : {dailyAdd}</p>
		</div>
	);
}

export default Totals;
