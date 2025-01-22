"use client";
import { userType } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Page = () => {
	const [profile, setProfile] = useState<userType | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get("/api/profile");
				setProfile(response.data);
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		if (session) {
			fetchProfile();
		}
	}, [session]);

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

const ProfileField = ({ label, value }: { label: string; value: string }) => (
	<div>
		<p className="text-sm text-[#89d57b]">{label}</p>
		<p className="font-bold">{value}</p>
	</div>
);

export default Page;
