const today = new Date();

export default function CalendarPages() {
	return (
		<>
			<div className=" ml-auto">
				<input
					className="bg-old_lace-500 dark:bg-night-500"
					type="date"
					defaultValue={`${today.getFullYear()}-${
						today.getMonth() + 1
					}-${today.getDate()}`}
					id="date"
					name="date"
				/>
			</div>
		</>
	);
}
