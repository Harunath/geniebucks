import Link from "next/link";
import { DarkMode } from "./home/DarkMode";
import Auth from "./Auth";

export default function Navbar() {
	return (
		<nav className="bg-old_lace dark:bg-[#4B5945] dark:text-neutral-200 transition duration-500 py-4">
			<div className="container mx-auto flex justify-between items-center px-4">
				<Link
					href="/"
					className="text-2xl font-bold text-neutral-900 dark:text-neutral">
					<h1 className="text-lg font-bold">GenieBucks</h1>
				</Link>
				<ul className="flex space-x-4">
					<li>
						<Link href="/" className="hover:underline">
							Home
						</Link>
					</li>
					<li>
						<Link href="/profile" className="hover:underline">
							Profile
						</Link>
					</li>
					<li>
						<Link href="/settings" className="hover:underline">
							Settings
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
