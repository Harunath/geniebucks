"use client";
import useStore from "@/store/state";
import { useEffect, useState } from "react";
import CalendarPages from "../home/CalendarPage";
import Chart from "./Chart";
import useChart from "@/store/hooks/useChart";

type dataType = {
	name: string;
	amount: number;
	entries: number;
};

function DayChart() {
	const getChartData = useChart();
	const transactionsList = useStore((state) => state.transactions);
	const [expData, setExpData] = useState<dataType[]>([]);
	const [incData, setIncData] = useState<dataType[]>([]);

	useEffect(() => {
		if (transactionsList) {
			setExpData([...getChartData({ transactionsList, type: "expense" })]);
			setIncData([...getChartData({ transactionsList, type: "income" })]);
		}
	}, [getChartData, transactionsList]);

	return (
		<div className=" h-full w-full">
			<div className="h-[10%] w-fit ml-auto">
				<CalendarPages />
			</div>
			<div className="h-[80%]">
				<div className="w-full h-1/2">
					<p>Expense chart</p>

					<Chart data={expData} />
				</div>
				<div className="w-full h-1/2">
					<p>Income chart</p>
					<Chart data={incData} />
				</div>
			</div>
		</div>
	);
}

export default DayChart;
