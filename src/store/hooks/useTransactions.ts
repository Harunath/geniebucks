import useStore from "../state";
import axios from "axios";

const useTransactions = () => {
	const setTransactionList = useStore((state) => state.setTransactions);

	const getTransactions = async (date: Date) => {
		try {
			console.log("inside hook");
			const response = await axios.get(`/api/transactions?date=${date}`);
			const transactions = response.data.transactions;
			if (transactions) setTransactionList(transactions);
			else setTransactionList([]);
		} catch (err) {
			console.error(err);
		}
	};
	return getTransactions;
};

export default useTransactions;
