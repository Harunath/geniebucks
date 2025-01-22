"use client";
import axios from "axios";
import React, { useState } from "react";
import AbsoluteCard from "../Ui/AbsoluteCard";
import Button from "../Ui/Button";
import useTransactions from "@/store/hooks/useTransactions";
import { toast, ToastContainer } from "react-toastify";

type expenseKind = "spent" | "add" | false;

const AddTransaction = () => {
	const getTransactions = useTransactions();
	const [kind, setKind] = useState<expenseKind>(false);
	const [enterNew, setEnterNew] = useState(false);
	const [spent, setSpent] = useState({
		amount: 0,
		for: "",
		date: new Date(),
		description: "",
	});
	const [add, setAdd] = useState({
		amount: 0,
		from: "",
		date: new Date(),
		description: "",
	});

	const transaction = async () => {
		let response;
		if (kind == "add") {
			response = await axios.post("/api/transactions", {
				amount: add.amount,
				type: "income",
				source: add.from,
				description: add.description,
				date: add.date,
			});
		} else {
			response = await axios.post("/api/transactions", {
				amount: spent.amount,
				type: "expense",
				source: spent.for,
				description: spent.description,
				date: spent.date,
			});
		}
		setKind(false);
		setEnterNew(false);
		if (response.data) {
			getTransactions(new Date());
			toast("Success");
			// toast(({ closeToast }) => <div>Hello 👋</div>);
			// alert("Sucess");
		} else toast("Failed");
		// alert("Error");
	};
	return (
		<div className="min-w-64 mt-4">
			<ToastContainer draggable={false} />
			<div className=" w-full">
				<Button onClick={() => setEnterNew(true)} text="Add new" />
			</div>
			{enterNew && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full rounded-lg bg-gradient-to-br from-[#ffffff] to-[#e6e9f0] dark:from-[#0c0e29] dark:to-[#141842] flex flex-col gap-6 justify-center items-center p-8 shadow-lg">
						<div>
							<p className="text-[#080a21] dark:text-[#ebecf9] text-xl font-semibold">
								Select the type of transaction
							</p>
						</div>
						<div className="flex gap-4">
							<Button
								onClick={() => setKind("spent")}
								text="Spent"
								className="bg-[#ff4136] hover:bg-[#ff5147] text-[#ffffff] dark:text-[#ebecf9] px-6 py-3 rounded-md transition-colors duration-300"
							/>
							<Button
								onClick={() => setKind("add")}
								text="Add"
								className="bg-[#2e9900] hover:bg-[#33ac00] text-[#ffffff] dark:text-[#ebecf9] px-6 py-3 rounded-md transition-colors duration-300"
							/>
						</div>
					</div>
				</AbsoluteCard>
			)}
			{kind && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full p-6 rounded-lg shadow-lg bg-white dark:bg-[#0c0e29]">
						<div className="flex flex-col space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<label
									htmlFor="amount"
									className="text-sm font-medium text-[#080a21] dark:text-[#ebecf9]">
									Add Amount:
								</label>
								<input
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
									type="number"
									id="amount"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({
												...prev,
												amount: Number(e.target.value),
											}));
										else
											setAdd((prev) => ({
												...prev,
												amount: Number(e.target.value),
											}));
									}}
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
								<label
									htmlFor="kind"
									className="text-sm font-medium text-[#080a21] dark:text-[#ebecf9]">
									{kind == "spent" ? "For:" : "From:"}
								</label>
								<input
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
									type="text"
									id="kind"
									onChange={(e) => {
										if (kind == "spent") {
											setSpent((prev) => ({ ...prev, for: e.target.value }));
										} else {
											setAdd((prev) => ({ ...prev, from: e.target.value }));
										}
									}}
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<label
									htmlFor="description"
									className="text-sm font-medium text-[#080a21] dark:text-[#ebecf9]">
									Description:
								</label>
								<textarea
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300 resize-none"
									id="description"
									rows={3}
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({
												...prev,
												description: e.target.value,
											}));
										else
											setAdd((prev) => ({
												...prev,
												description: e.target.value,
											}));
									}}
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<label
									htmlFor="date"
									className="text-sm font-medium text-[#080a21] dark:text-[#ebecf9]">
									Date:
								</label>
								<input
									defaultValue={`${new Date().getFullYear()}-${
										new Date().getMonth() + 1
									}-${new Date().getDate()}`}
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
									type="datetime-local"
									name="date"
									id="date"
									onChange={(e) => {
										if (kind == "spent") {
											setSpent((prev) => ({
												...prev,
												date: new Date(e.target.value),
											}));
										} else
											setAdd((prev) => ({
												...prev,
												date: new Date(e.target.value),
											}));
									}}
								/>
							</div>
							<Button
								onClick={transaction}
								text={kind == "spent" ? "Add Expense" : "Add Income"}
								className="w-full mt-4 bg-[#2e9900] hover:bg-[#33ac00] text-white dark:text-[#ebecf9] py-3 rounded-md transition-colors duration-300"
							/>
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
};

export default AddTransaction;
