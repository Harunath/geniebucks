import MainLayout from "@/components/layouts/MainLayout";
import Navbar from "@/components/NavBar";

const links = [
	{
		text: "Home",
		link: "/",
	},
	{
		text: "Profile",
		link: "/profile",
	},
	{
		text: "EMI's",
		link: "/emis",
	},
	{
		text: "analytics",
		link: "/day",
	},
];

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MainLayout>
				<Navbar links={links} />
				<div className="my-4 grow p-6 rounded-lg bg-gradient-to-br from-[#ffffff] to-[#e6e9f0] dark:from-[#0c0e29] dark:to-[#141842] shadow-lg">
					{children}
				</div>
			</MainLayout>
		</>
	);
}

export default layout;
