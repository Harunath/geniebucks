"use client";
import UpdateProfile from "@/components/profile/UpdateProfile";
import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";

type userProfile = {
	email: string;
	password: string | null;
	name: string;
	profession: string;
	gender: string;
	id: number;
};
const Page = () => {
	const [profile, setProfile] = useState<userProfile>({
		email: "",
		password: "",
		name: "",
		profession: "",
		gender: "",
		id: -1,
	});
	const getProfile = async () => {
		const res = await axios.get("/api/profile");
		setProfile(res.data.response);
	};
	useEffect(() => {
		getProfile();
	}, []);
	return (
		<div>
			{profile && (
				<div>
					<div>
						<p>Name</p>
						<p className=" font-bold">{profile.name}</p>
					</div>
					<div>
						<p>email</p>
						<p className=" font-bold">{profile.email}</p>
					</div>
					<div>
						<p>Profession Details</p>
						<p className=" font-bold">{profile.profession}</p>
					</div>
					<div>
						<p>Gender</p>
						<p className=" font-bold">{profile.gender}</p>
					</div>
					<UpdateProfile
						userGender={profile.gender}
						userName={profile.name}
						userProfession={profile.profession}
					/>
				</div>
			)}
		</div>
	);
};

export default Page;
