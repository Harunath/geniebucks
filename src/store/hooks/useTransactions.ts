import useStore from "../state";
import axios from "axios";
import { useCallback } from "react";

const useTransactions = () => {
	const setTransactionList = useStore((state) => state.setTransactions);

	const getTransactions = useCallback(
		async (date: Date) => {
			try {
				console.log(date, " use transactions date");
				const response = await axios.get(`/api/transactions?date=${date}`);
				const transactions = response.data.transactions;
				if (transactions) setTransactionList(transactions);
				else setTransactionList([]);
			} catch (err) {
				console.error(err);
			}
		},
		[setTransactionList]
	);

	return getTransactions;
};

export default useTransactions;
