import Link from "next/link";
import { DarkMode } from "./home/DarkMode";

export default function Navbar() {
	return (
		<nav className="bg-old_lace dark:bg-[#4B5945] dark:text-neutral-200 transition duration-500 py-4">
			<div className="container mx-auto flex justify-between items-center px-4">
				<h1 className="text-lg font-bold">GenieBucks</h1>
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
				</ul>
			</div>
		</nav>
	);
}
