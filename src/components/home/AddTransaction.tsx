"use client";
import axios from "axios";
import React, { useState } from "react";
import AbsoluteCard from "../Ui/AbsoluteCard";
import Button from "../Ui/Button";
import useStore from "@/store/state";

type expenseKind = "spent" | "add" | false;

const AddTransaction = () => {
	const setTransactionList = useStore((state) => state.setTransactions);

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
			const res = await axios.get("/api/transactions");
			setTransactionList(res.data.transactions);
			alert("Sucess");
		} else alert("Error");
	};
	return (
		<div className="min-w-80 mt-4">
			<div className="w-full flex place-content-end">
				<Button onClick={() => setEnterNew(true)} text="Add new" />
			</div>
			{enterNew && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full rounded bg-english_violet-800 flex flex-col gap-2 justify-center items-center">
						<Button onClick={() => setKind("spent")} text="Spent" />
						<Button onClick={() => setKind("add")} text="Add" />
					</div>
				</AbsoluteCard>
			)}
			{kind && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full bg-english_violet-600 text-night p-1">
						<div className="flex flex-col">
							<div className="grid grid-cols-2 gap-x-2">
								<label htmlFor="amount">Add Amount :</label>
								<input
									className=" bg-pearl-700 rounded"
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
							<div className="grid grid-cols-2 gap-x-2">
								<label htmlFor="kind">
									{kind == "spent" ? "For : " : "From : "}
								</label>
								<input
									className=" bg-pearl-700 rounded"
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
							<div className="grid grid-cols-2 gap-x-2">
								<label htmlFor="description">Description :</label>
								<input
									className=" bg-pearl-700 rounded"
									type="textarea"
									id="description"
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
							<div className="grid grid-cols-2 gap-x-2">
								<label htmlFor="date">Date</label>
								<input
									className=" bg-pearl-700 rounded"
									type="datetime-local"
									name="date"
									id="date"
								/>
							</div>
							<Button
								onClick={transaction}
								text={kind == "add" ? "add income" : "add expense"}
							/>
							:
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
};

export default AddTransaction;
