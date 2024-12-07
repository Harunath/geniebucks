import React from "react";

const List = () => {
	const l = [
		{
			amount: "10",
			from: "abc",
			description: "ahvchcakhcbahcba",
		},
	];
	return (
		<div className="max-w-64">
			{l.map((item, index) => (
				<div key={index} className=" bg-yellow-200 rounded p-2">
					<div className="flex">
						<p className="w-1/2">Amount : {item.amount}</p>
						<p className="grow">From : {item.from}</p>
					</div>
					{item.description.length > 0 && (
						<p>Description : {item.description}</p>
					)}
				</div>
			))}
		</div>
	);
};

export default List;
