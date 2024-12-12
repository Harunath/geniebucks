"use client";
import axios from "axios";
import React, { useState } from "react";

type expenseKind = "spent" | "add" | false;

const AddTransaction = () => {
	const [kind, setKind] = useState<expenseKind>(false);
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
		<div className="max-w-60 bg-blue-100">
			<div className="flex gap-x-2">
				<button onClick={() => setKind("spent")}>Spent</button>
				<button onClick={() => setKind("add")}>Add</button>
			</div>
			{kind && (
				<div className="absolute left-0 top-0 flex justify-center items-center h-screen w-screen bg-blue-400">
					<div className="w-60">
						<div>
							<button onClick={() => setKind(false)}>Close</button>
						</div>
						<div className="flex flex-col">
							<div className="flex gap-x-2">
								<label htmlFor="amount">Add Amount :</label>
								<input
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
							<div>
								<label htmlFor="amount">
									{kind == "spent" ? "For : " : "From : "}
								</label>
								<input
									type="text"
									id="kind"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({ ...prev, for: e.target.value }));
										else setAdd((prev) => ({ ...prev, from: e.target.value }));
									}}
								/>
							</div>
							<div>
								<label htmlFor="description">Description :</label>
								<input
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
							<div>
								<label htmlFor="date">Date</label>
								<input type="datetime-local" name="date" id="date" />
							</div>
							<button onClick={transaction}>
								{kind == "add" ? "add income" : "add expense"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddTransaction;
