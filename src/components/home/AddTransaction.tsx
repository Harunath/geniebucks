"use client";
import React, { useState } from "react";

type expenseKind = "spent" | "add" | false;

const AddTransaction = () => {
	const [kind, setKind] = useState<expenseKind>(false);
	const [spent, setSpent] = useState({
		amount: "",
		for: "",
		date: new Date(),
	});
	const [add, setAdd] = useState({
		amount: "",
		from: "",
		date: new Date(),
	});
	const transaction = async () => {
		if (kind == "add") console.log(add);
		else console.log(spent);
	};
	return (
		<div className="max-w-60">
			<div className="flex gap-x-2">
				<button onClick={() => setKind("spent")}>Spent</button>
				<button onClick={() => setKind("add")}>Add</button>
			</div>
			{kind && (
				<div className="absolute left-0 top-0 flex justify-center items-center h-screen w-screen">
					<div className="w-60">
						<div>
							<button onClick={() => setKind(false)}>Close</button>
						</div>
						<div>
							<label htmlFor="amount">
								Add Amount :
								<input
									type="text"
									id="amount"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({ ...prev, amount: e.target.value }));
										else
											setAdd((prev) => ({ ...prev, amount: e.target.value }));
									}}
								/>
							</label>
							<label htmlFor="amount">
								{kind == "spent" ? "For : " : "From : "}
								<input
									type="text"
									id="kind"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({ ...prev, for: e.target.value }));
										else setAdd((prev) => ({ ...prev, from: e.target.value }));
									}}
								/>
							</label>
							<label htmlFor="description">
								Description :
								<input
									type="textarea"
									id="description"
									onChange={(e) => {
										if (kind == "spent")
											setSpent((prev) => ({ ...prev, for: e.target.value }));
										else setAdd((prev) => ({ ...prev, from: e.target.value }));
									}}
								/>
							</label>
							<button onClick={transaction}>Add Expense</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddTransaction;
