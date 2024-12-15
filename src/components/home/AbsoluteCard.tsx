import React from "react";

const AbsoluteCard = ({
	children,
	close,
}: {
	children: React.ReactNode;
	close: () => void;
}) => {
	return (
		<div className="absolute left-0 top-0 z-10 h-screen w-screen bg-opacity-50 backdrop-blur-md bg-night-100 flex justify-center items-center">
			<div className="min-w-80 min-h-80 rounded overflow-hidden p-2 bg-english_violet-700 shadow shadow-african_violet-700 flex flex-col">
				<div className="w-full mb-2 flex place-content-end">
					<button
						className="px-2 bg-old_lace bg-opacity-30 text-night rounded-full ml-auto"
						onClick={close}>
						X
					</button>
				</div>
				<div className="grow h-full w-full grid">{children}</div>
			</div>
		</div>
	);
};

export default AbsoluteCard;
