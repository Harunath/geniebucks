import AddTransaction from "@/components/home/AddTransaction";
import CalendarPage from "@/components/home/CalendarPage";
import List from "@/components/home/List";

export default function Home() {
	return (
		<div className="mt-4">
			<div className="flex flex-col items-center">
				<CalendarPage />
				<List />
				<AddTransaction />
			</div>
		</div>
	);
}
