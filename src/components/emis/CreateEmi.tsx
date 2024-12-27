"use client";
import React, { useState } from "react";
import AbsoluteCard from "../Ui/AbsoluteCard";
import axios from "axios";
import Button from "../Ui/Button";

function CreateEmi() {
	const [open, setOpen] = useState(false);
	const [emi, setEmi] = useState({
		amount: 0,
		to: "",
		for: "",
		status: "PENDING",
		installmentNumber: 0,
		totalInstallments: 0,
		date: new Date(),
		dueDate: new Date(),
		endDate: new Date(),
		notes: "",
	});

	const create = async () => {
		try {
			const response = await axios.post("/api/emis", { ...emi });
			console.log(response.data);
			setOpen(false);
		} catch (e) {
			console.error(e);
			alert("Failed to create EMI");
		}
	};

	return (
		<div>
			<Button
				onClick={() => setOpen(true)}
				text="Create EMI"
				className="bg-[#2e9900] hover:bg-[#33ac00] text-white dark:text-[#ebecf9] py-2 px-4 rounded-md transition-colors duration-300"
			/>
			{open && (
				<AbsoluteCard close={() => setOpen(false)}>
					<div className="bg-white dark:bg-[#0c0e29] text-[#080a21] dark:text-[#ebecf9] p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
						<h2 className="text-2xl font-bold mb-6 text-center">Create EMI</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{[
								{ label: "Loan Amount", name: "amount", type: "number" },
								{ label: "To", name: "to", type: "text" },
								{ label: "For", name: "for", type: "text" },
								{
									label: "Current Installment",
									name: "installmentNumber",
									type: "number",
								},
								{
									label: "Total Installments",
									name: "totalInstallments",
									type: "number",
								},
								{ label: "Due Date", name: "dueDate", type: "date" },
								{ label: "End Date", name: "endDate", type: "date" },
								{ label: "Notes", name: "notes", type: "text" },
							].map((field) => (
								<div key={field.name}>
									<label
										htmlFor={field.name}
										className="block text-sm font-medium mb-1">
										{field.label}
									</label>
									<input
										type={field.type}
										id={field.name}
										name={field.name}
										onChange={(e) =>
											setEmi((prev) => ({
												...prev,
												[field.name]:
													field.type === "number"
														? Number(e.target.value)
														: field.type === "date"
														? new Date(e.target.value)
														: e.target.value,
											}))
										}
										defaultValue={
											field.type === "date"
												? `${new Date().getFullYear()}-${String(
														new Date().getMonth() + 1
												  ).padStart(2, "0")}-${String(
														new Date().getDate()
												  ).padStart(2, "0")}`
												: undefined
										}
										className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#141842] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
									/>
								</div>
							))}
						</div>
						<div className="mt-6">
							<Button
								onClick={create}
								text="Create EMI"
								className="w-full bg-[#2e9900] hover:bg-[#33ac00] text-white dark:text-[#ebecf9] py-2 px-4 rounded-md transition-colors duration-300"
							/>
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
}

export default CreateEmi;
