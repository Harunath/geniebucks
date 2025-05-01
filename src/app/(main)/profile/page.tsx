import { authOptions } from "@/lib/auth";
import { userType } from "@/lib/types";
import axios from "axios";
import { getServerSession, User } from "next-auth";
import { redirect } from "next/navigation";

interface ProfileFieldProps {
	label: string;
	value?: string | null;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => (
	<div>
		<p className="text-sm text-[#89d57b]">{label}</p>
		<p className="font-bold">{value || "N/A"}</p>
	</div>
);

async function getProfileData(
	user: User | undefined
): Promise<userType | null> {
	if (!user || !user.email) {
		return null;
	}
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data as userType;
	} catch (error) {
		console.error("Error fetching profile:", error);
		return null;
	}
}

const Page = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		redirect("/api/auth/signin"); // Ensure you import 'redirect' from 'next/navigation'
	}

	const profile = await getProfileData(session?.user);

	if (!profile) {
		return <div>Loading...</div>;
	}
	return (
		<div className="h-full">
			<div className="max-w-2xl mx-auto mt-8 max-h-[calc(100%)-4rem] overflow-y-auto p-6 bg-gradient-to-br from-[#ffffff] to-[#e6e9f0] dark:from-[#0c0e29] dark:to-[#141842] rounded-lg shadow-lg text-[#080a21] dark:text-[#ebecf9]">
				<h1 className="text-2xl font-bold mb-6">User Profile</h1>
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-y-8">
						<ProfileField label="Name" value={profile.name} />
						<ProfileField label="Email" value={profile.email} />
						<ProfileField label="Profession" value={profile.profession} />
						<ProfileField label="Gender" value={profile.gender} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
