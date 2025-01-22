import { useCallback } from "react";
import { transactionTypes } from "@/lib/types";

type ChartDataPoint = {
	name: string;
	amount: number;
	entries: number;
};

export default function useChart() {
	const getDate = (date: Date): number => {
		return new Date(date).getHours();
	};

	const initializeChartData = (): ChartDataPoint[] => {
		return Array.from({ length: 24 }, (_, i) => ({
			name: i.toString().padStart(2, "0"),
			amount: 0,
			entries: 0,
		}));
	};
	const getChartData = useCallback(
		({
			transactionsList,
			type,
		}: {
			transactionsList: transactionTypes[] | null;
			type: "expense" | "income";
		}): ChartDataPoint[] => {
			const chartData = initializeChartData();
			if (transactionsList) {
				transactionsList.forEach((item) => {
					if (item.type === type) {
						const hour = getDate(item.date);
						chartData[hour].amount += item.amount;
						chartData[hour].entries += 1;
					}
				});
			}
			return chartData;
		},
		[]
	);

	return getChartData;
}
