"use client";
import { emiTypes } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

function Emis() {
	const [emis, setEmis] = useState<emiTypes[]>([]);
	useEffect(() => {
		const getEmis = async () => {
			const response = await axios.get("http://localhost:3000/api/emis");
			setEmis(response.data.emis);
			console.log(response.data);
		};
		getEmis();
	}, []);
	return (
		<div>
			{emis ? (
				<div>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-x-2">
						<p>Amount</p>
						<p>For</p>
						<p className="hidden md:block">To</p>
						<p className="hidden md:block">Installment</p>
						<p className="hidden md:block">Total</p>
						<p className="hidden md:block">Date</p>
					</div>
					{emis.map((emi: emiTypes) => (
						<div
							key={emi.id}
							className="grid grid-cols-2 md:grid-cols-6 gap-x-2">
							<p className="">{emi.amount}</p>
							<p className="">{emi.for}</p>
							<p className="hidden md:block">{emi.to ? `${emi.to}` : " - "}</p>
							<p className="hidden md:block">{emi.installmentNumber}</p>
							<p className="hidden md:block">{emi.totalInstallments}</p>
							<p className="hidden md:block">
								{emi.endDate.toLocaleString().slice(0, 10)}
							</p>
						</div>
					))}
				</div>
			) : (
				<div>
					<p>No emis...!🤔</p>
				</div>
			)}
		</div>
	);
}

// export default Emis;

// import { emiTypes } from "@/lib/types";

// async function Emis() {
// 	const response = await fetch("http://localhost:3000/api/emis", {
// 		next: { revalidate: 1000 },
// 	});
// 	const data = await response.json();
// 	console.log(data);
// 	return (
// 		<div>
// 			{data.emis ? (
// 				data.emis.map((emi: emiTypes) => (
// 					<div key={emi.id}>
// 						<p>{emi.amount}</p>
// 						<p>{emi.for}</p>
// 					</div>
// 				))
// 			) : (
// 				<div>
// 					<p>No emis...!🤔</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

export default Emis;
