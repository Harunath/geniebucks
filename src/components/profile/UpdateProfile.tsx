"use client";
import React, { useState } from "react";
import Button from "../Ui/Button";
import AbsoluteCard from "../Ui/AbsoluteCard";
import axios from "axios";

function UpdateProfile({
	userName,
	userProfession,
	userGender,
}: {
	userName: string;
	userProfession: string;
	userGender: string;
}) {
	const [update, setUpdate] = useState(false);
	const genderOptions = ["Male", "Female", "Other", "PreferNotToSay"];
	const professionOptions = [
		"Employed",
		"SelfEmployed",
		"Business",
		"Student",
		"Retired",
		"Unemployed",
	];
	const [name, setName] = useState(userName);
	const [profession, setProfession] = useState(userProfession);
	const [gender, setGender] = useState(userGender);

	const updateProfile = async () => {
		try {
			const response = await axios.post("/api/profile", {
				name,
				gender,
				profession,
			});
			console.log(response);
			alert("Success");
		} catch (error) {
			if (error instanceof Error) console.error(error);
			console.error("failed with unknown error");
		} finally {
			setUpdate(false);
		}
	};

	return (
		<div>
			<Button
				onClick={() => setUpdate(true)}
				text="Update Profile"
				className="bg-[#2e9900] hover:bg-[#33ac00] text-white dark:text-[#ebecf9] py-2 px-4 rounded-md transition-colors duration-300"
			/>
			{update && (
				<AbsoluteCard close={() => setUpdate(false)}>
					<div className="bg-white dark:bg-[#0c0e29] text-[#080a21] dark:text-[#ebecf9] p-6 rounded-lg shadow-xl max-w-md w-full">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Update Profile
						</h2>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium mb-1">
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									defaultValue={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#141842] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300"
								/>
							</div>
							<div>
								<label
									htmlFor="profession"
									className="block text-sm font-medium mb-1">
									Profession
								</label>
								<select
									name="profession"
									id="profession"
									value={profession}
									onChange={(e) => setProfession(e.target.value)}
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#141842] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300">
									{professionOptions.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="gender"
									className="block text-sm font-medium mb-1">
									Gender
								</label>
								<select
									name="gender"
									id="gender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									className="w-full px-3 py-2 bg-[#f0f2f5] dark:bg-[#141842] rounded-md border border-[#31aa3b]/30 focus:outline-none focus:ring-2 focus:ring-[#31aa3b]/50 transition duration-300">
									{genderOptions.map((item) => (
										<option key={item} value={item}>
											{item}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="mt-6">
							<Button
								onClick={updateProfile}
								text="Update"
								className="w-full bg-[#2e9900] hover:bg-[#33ac00] text-white dark:text-[#ebecf9] py-2 px-4 rounded-md transition-colors duration-300"
							/>
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
}

export default UpdateProfile;
