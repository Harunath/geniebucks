"use client";
import useStore from "@/store/state";
import { useState } from "react";
import Totals from "./Totals";
import { TransactTypes } from "@/lib/types";
import AddTransaction from "./AddTransaction";
import CalendarPages from "./CalendarPage";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import VoiceInput from "../upload/VoiceInput";

const List = () => {
	const transactionsList = useStore((state) => state.transactions);
	const [selected, setSelected] = useState(-1);

	const GetDate = (date: Date) => {
		const t = new Date(date).toLocaleTimeString();
		return t.slice(0, t.length - 6) + " " + t.slice(t.length - 2, t.length);
	};

	return (
		<div className="w-full h-full flex flex-col p-4 bg-linear-to-br from-[#ffffff]/90 to-[#e6e9f0]/90 dark:from-[#0c0e29]/10 dark:to-[#141842]/80 text-[#080a21]/90 dark:text-[#ebecf9]/90 rounded-lg shadow-md shadow-[#080a21]/5 dark:shadow-[#ebecf9]/5 hover:shadow-xl transition-all duration-300">
			<div className="flex flex- justify-end items-center gap-x-2">
				<CalendarPages />

				<Link className="w-fit" href="/uploadimage">
					<Image
						src="https://res.cloudinary.com/degrggosz/image/upload/v1739213272/photo-camera_bqbpyr.svg"
						alt="Upload Image"
						width={100}
						height={100}
						className="h-10 w-10"
					/>
				</Link>
			</div>
			{transactionsList && transactionsList.length > 0 ? (
				<div className="space-y-4 h-full">
					<div className="grid grid-cols-3 gap-x-4 p-2 sm:w-11/12 font-semibold text-[#2e9900] dark:text-[#89d57b]">
						<p>Type</p>
						<p>Amount</p>
						<p className="hidden sm:block">Time</p>
					</div>
					<div className="h-64 p-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-slate-200 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-300 overflow-y-auto ">
						{transactionsList.map((item, index) => (
							<div
								key={index}
								className="border-b border-[#31aa3b]/30 hover:bg-[#e6e9f0] dark:hover:bg-[#101345] transition duration-300">
								<div className="flex">
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 p-2 grow">
										<div>
											{item.type == TransactTypes.income ? (
												<p className="w-20 font-semibold text-[#2e9900]">In</p>
											) : (
												<p className="w-20 font-semibold text-[#ff4136]">Out</p>
											)}
										</div>
										<p>{item.amount}</p>
										<p className="hidden sm:block">{GetDate(item.date)}</p>
									</div>
									<div className=" w-1/12">
										<svg
											onClick={() => {
												if (selected == index) setSelected(-1);
												else setSelected(index);
											}}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="icon icon-tabler icons-tabler-filled icon-tabler-caret-down hover:text-blue-600 transition-all duration-300">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											{selected == index ? (
												<path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" />
											) : (
												<path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
											)}
										</svg>
									</div>
								</div>
								<AnimatePresence>
									{selected == index && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className="bg-[#f0f2f5] dark:bg-[#0c0e29] p-2 rounded-md overflow-hidden">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 p-2">
												<p>
													Source : {item.source ? item.source : "enter source"}
												</p>
												<p>
													Category :{" "}
													{item.category ? item.category : "enter category"}
												</p>
											</div>
											<div>
												<p>
													Description :{" "}
													{item.description
														? item.description
														: "enter description"}
												</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
					<div>
						<Totals transactions={transactionsList} />
					</div>
					<AddTransaction />
				</div>
			) : (
				<div className="text-center py-8 text-[#2e9900] dark:text-[#89d57b]">
					<p>NO TRANSACTIONS .....!</p>
					<div className=" w-1/2">
						<AddTransaction />
					</div>
					<div>
						<VoiceInput
							onResult={(text) => {
								console.log(text);
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default List;
