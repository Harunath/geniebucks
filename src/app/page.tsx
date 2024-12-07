import AddTransaction from "@/components/home/AddTransaction";
import List from "@/components/home/List";

export default function Home() {
	return (
		<div>
			<h1>Welcome to my home page</h1>
			<div className="flex flex-col items-center">
				<List />
				<AddTransaction />
			</div>
		</div>
	);
}
