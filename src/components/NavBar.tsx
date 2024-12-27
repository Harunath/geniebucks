import Link from "next/link";
import { DarkMode } from "./home/DarkMode";
import Auth from "./Auth";

export default function Navbar() {
	return (
		<nav className="bg-gradient-to-r from-[#f0f2f5] to-[#e6e9f0] dark:from-[#0a0c23] dark:to-[#101339] py-4 shadow-md transition-colors duration-300">
			<div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
				<Link
					href="/"
					className="text-2xl font-bold text-[#080a21] dark:text-[#ebecf9] mb-4 sm:mb-0 transition-colors duration-300">
					<h1 className="text-lg font-bold">GenieBucks</h1>
				</Link>
				<ul className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
					<li>
						<Link
							href="/"
							className="text-[#080a21] dark:text-[#ebecf9] hover:text-[#2e9900] dark:hover:text-[#31aa3b] transition duration-300">
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/profile"
							className="text-[#080a21] dark:text-[#ebecf9] hover:text-[#2e9900] dark:hover:text-[#31aa3b] transition duration-300">
							Profile
						</Link>
					</li>
					<li>
						<Link
							href="/emis"
							className="text-[#080a21] dark:text-[#ebecf9] hover:text-[#2e9900] dark:hover:text-[#31aa3b] transition duration-300">
							Emis
						</Link>
					</li>
					<li>
						<DarkMode />
					</li>
					<li>
						<Auth />
					</li>
				</ul>
			</div>
		</nav>
	);
}
