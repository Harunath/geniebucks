"use client";
import axios from "axios";
import React, { useState } from "react";
import AbsoluteCard from "./AbsoluteCard";

type expenseKind = "spent" | "add" | false;

const AddTransaction = () => {
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
			console.log(add);
			response = await axios.post("/api/transactions", {
				amount: add.amount,
				type: "income",
				sourse: add.from,
				description: add.description,
				date: add.date,
			});
		} else {
			response = await axios.post("/api/transactions", {
				amount: spent.amount,
				type: "expense",
				sourse: spent.for,
				description: spent.description,
				date: spent.date,
			});
		}
		console.log(response);
	};
	return (
		<div className="min-w-80 mt-4">
			<div className="w-full flex place-content-end">
				<button
					onClick={() => setEnterNew(true)}
					className="min-w-20 p-2 rounded ml-auto bg-african_violet-300 text-puce-800">
					Add new
				</button>
			</div>
			{enterNew && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full rounded bg-english_violet-800 flex flex-col gap-2 justify-center items-center">
						<button
							className=" min-w-20 p-2 rounded bg-african_violet-300 text-puce-800"
							onClick={() => setKind("spent")}>
							Spent
						</button>
						<button
							className=" min-w-20 p-2 rounded bg-african_violet-300 text-puce-800"
							onClick={() => setKind("add")}>
							Add
						</button>
					</div>
				</AbsoluteCard>
			)}
			{kind && (
				<AbsoluteCard
					close={() => {
						setKind(false);
						setEnterNew(false);
					}}>
					<div className="h-full w-full bg-english_violet-600 p-1">
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
								<label htmlFor="amount">
									{kind == "spent" ? "For : " : "From : "}
								</label>
								<input
									className=" bg-pearl-700 rounded"
									type="text"
									id="kind"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({ ...prev, for: e.target.value }));
										else setAdd((prev) => ({ ...prev, from: e.target.value }));
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
							<button onClick={transaction}>
								{kind == "add" ? "add income" : "add expense"}
							</button>
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
};

export default AddTransaction;
