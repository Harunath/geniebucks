const today = new Date();

export default function CalendarPages() {
	return (
		<>
			<div>
				<input
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
