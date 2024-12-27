import React from "react";

const AbsoluteCard = ({
	children,
	close,
}: {
	children: React.ReactNode;
	close: () => void;
}) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f0f2f5] dark:bg-[#080a12] backdrop-blur-md">
			<div className="w-11/12 max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#e6e9f0] dark:from-[#0c0e31] dark:to-[#141851] text-[#080a21] dark:text-[#ebecf9] p-6 text-left align-middle shadow-xl transition-all">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-medium leading-6 text-[#080a21] dark:text-[#ebecf9]">
						Modal Title
					</h3>
					<button
						onClick={close}
						className="rounded-full p-1 text-[#080a21] dark:text-[#ebecf9] transition-colors duration-300 hover:bg-[#31aa3b]/20 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50">
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="mt-2">{children}</div>
			</div>
		</div>
	);
};

export default AbsoluteCard;
