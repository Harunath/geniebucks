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
			console.error("failed with unkown error");
		} finally {
			setUpdate(false);
		}
	};
	return (
		<div>
			<div>
				<Button onClick={() => setUpdate(true)} text="Update profile" />
			</div>
			{update && (
				<AbsoluteCard close={() => setUpdate(false)}>
					<div>
						Update profile
						<div>
							<div>
								<p>Name</p>
								<input
									type="text"
									name="name"
									id="name"
									defaultValue={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<p>Profession</p>
								<select
									name="profesion"
									id="profesion"
									onChange={(e) => setProfession(e.target.value)}>
									{professionOptions.map((item) => (
										<option key={item} value={item} defaultValue={profession}>
											{item}
										</option>
									))}
								</select>
							</div>
							<div>
								<p>Gender</p>
								<select
									name="gender"
									id="gender"
									onChange={(e) => setGender(e.target.value)}>
									{genderOptions.map((item) => (
										<option key={item} value={item} defaultValue={gender}>
											{item}
										</option>
									))}
								</select>
							</div>
						</div>
						<div>
							<Button onClick={updateProfile} text="Update" />
						</div>
					</div>
				</AbsoluteCard>
			)}
		</div>
	);
}

export default UpdateProfile;
