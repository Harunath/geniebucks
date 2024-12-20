"use client";
import React, { useState } from "react";
import AbsoluteCard from "../Ui/AbsoluteCard";
import axios from "axios";
import Button from "../Ui/Button";

function CreateEmi() {
	const [close, setClose] = useState(false);
	const [emi, setEmi] = useState<{
		amount: number;
		to?: string;
		for: string;
		status: "PENDING" | "PAID" | "OVERDUE";
		installmentNumber: number;
		totalInstallments: number;
		dueDate: Date;
		endDate: Date;
		date: Date;
		notes: string;
	}>({
		amount: 0,
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
		} catch (e) {
			console.error(e);
			alert("failed to create emi");
		} finally {
			setClose(true);
		}
	};
	return (
		<div>
			<div>
				<Button onClick={() => setClose(true)} text="Create" />
			</div>
			{close && (
				<AbsoluteCard close={() => setClose(false)}>
					<div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="amount">
								Loan Amount
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="number"
									name="amount"
									id="amount"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, amount: Number(e.target.value) };
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="to">
								To
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="text"
									name="to"
									id="to"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, to: e.target.value };
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="for">
								for
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="text"
									name="for"
									id="for"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, for: e.target.value };
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="notes">
								notes
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="text"
									name="notes"
									id="notes"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, notes: e.target.value };
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label
								className="mx-2 bg-african_violet-400"
								htmlFor="installmentNumber">
								Current installment Number
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="number"
									name="installmentNumber"
									id="installmentNumber"
									onChange={(e) =>
										setEmi((prev) => {
											return {
												...prev,
												installmentNumber: Number(e.target.value),
											};
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label
								className="mx-2 bg-african_violet-400"
								htmlFor="totalInstallments">
								Total no. of installments
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="number"
									name="totalInstallments"
									id="totalInstallments"
									onChange={(e) =>
										setEmi((prev) => {
											return {
												...prev,
												totalInstallments: Number(e.target.value),
											};
										})
									}
								/>
							</label>
						</div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="dueDate">
								dueDate
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="date"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, dueDate: new Date(e.target.value) };
										})
									}
									defaultValue={`${new Date().getFullYear()}-${
										new Date().getMonth() + 1
									}-${new Date().getDate()}`}
									id="dueDate"
									name="dueDate"
								/>
							</label>
						</div>
						<div className="mt-2">
							<label className="mx-2 bg-african_violet-400" htmlFor="endDate">
								endDate
								<input
									className="mx-2 bg-african_violet-100 text-magnolia"
									type="date"
									onChange={(e) =>
										setEmi((prev) => {
											return { ...prev, endDate: new Date(e.target.value) };
										})
									}
									defaultValue={`${new Date().getFullYear()}-${
										new Date().getMonth() + 1
									}-${new Date().getDate()}`}
									id="endDate"
									name="endDate"
								/>
							</label>
						</div>
						<div>
							<Button onClick={create} text="Create" />
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
}

export default CreateEmi;
