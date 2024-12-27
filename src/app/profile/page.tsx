"use client";
import UpdateProfile from "@/components/profile/UpdateProfile";
import axios from "axios";
import { useEffect, useState } from "react";

type UserProfile = {
	email: string;
	password: string | null;
	name: string;
	profession: string;
	gender: string;
	id: number;
	setSpendLimit: boolean;
	spendingLimit: number | null;
};

const Page = () => {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [isEditingLimit, setIsEditingLimit] = useState(false);
	const [newSpendLimit, setNewSpendLimit] = useState<number | null>(null);

	const getProfile = async () => {
		const res = await axios.get("/api/profile");
		setProfile(res.data.response);
		setNewSpendLimit(res.data.response.spendingLimit);
	};

	useEffect(() => {
		getProfile();
	}, []);

	const handleSpendLimitToggle = async () => {
		try {
			await axios.post("/api/profile/spendlimit", {
				setSpendLimit: !profile?.setSpendLimit,
			});
			getProfile();
		} catch (error) {
			console.error("Error toggling spend limit:", error);
		}
	};

	const handleSpendLimitUpdate = async () => {
		try {
			await axios.post("/api/profile/updateSpendLimit", {
				spendingLimit: newSpendLimit,
			});
			setIsEditingLimit(false);
			getProfile();
		} catch (error) {
			console.error("Error updating spend limit:", error);
		}
	};

	if (!profile) return <div>Loading...</div>;

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
					<div className="mt-8">
						<UpdateProfile
							userGender={profile.gender}
							userName={profile.name}
							userProfession={profile.profession}
						/>
					</div>

					<div className="border-t border-[#31aa3b]/30 pt-4 mt-4">
						<h2 className="text-xl font-semibold mb-2">Spending Limit</h2>
						<div className="flex items-center justify-between">
							<span>Enable Spending Limit:</span>
							<button
								onClick={handleSpendLimitToggle}
								className={`px-4 py-2 rounded-md transition-colors duration-300 ${
									profile.setSpendLimit
										? "bg-[#2e9900] hover:bg-[#33ac00] text-white"
										: "bg-[#ff4136] hover:bg-[#ff5147] text-white"
								}`}>
								{profile.setSpendLimit ? "Enabled" : "Disabled"}
							</button>
						</div>
						{profile.setSpendLimit && (
							<div className="mt-2">
								{isEditingLimit ? (
									<div className="flex items-center space-x-2">
										<input
											type="number"
											value={newSpendLimit || ""}
											onChange={(e) => setNewSpendLimit(Number(e.target.value))}
											className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#080a21] text-[#080a21] dark:text-[#ebecf9] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50"
										/>
										<button
											onClick={handleSpendLimitUpdate}
											className="px-4 py-2 bg-[#2e9900] hover:bg-[#33ac00] text-white rounded-md transition-colors duration-300">
											Save
										</button>
									</div>
								) : (
									<div className="flex items-center justify-between">
										<span>Current Limit: ${profile.spendingLimit}</span>
										<button
											onClick={() => setIsEditingLimit(true)}
											className="px-4 py-2 bg-[#31aa3b] hover:bg-[#3bbb47] text-white rounded-md transition-colors duration-300">
											Edit
										</button>
									</div>
								)}
							</div>
						)}
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
