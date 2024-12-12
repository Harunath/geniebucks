import AddTransaction from "@/components/home/AddTransaction";
import CalendarPage from "@/components/home/CalendarPage";
import DarkModeToggle from "@/components/home/DarkModeToggle";
import List from "@/components/home/List";

export default function Home() {
	return (
		<div>
			<h1>GenieBucks</h1>
			<div className="flex flex-col items-center">
				<DarkModeToggle />
				<CalendarPage />
				<List />
				<AddTransaction />
			</div>
		</div>
	);
}
