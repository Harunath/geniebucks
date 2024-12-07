"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";

type userProfile = {
	email: string;
	password: string | null;
	name: string;
	id: number;
};
const Page = () => {
	const [profile, setProfile] = useState<userProfile>({
		email: "",
		password: "",
		name: "",
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
				</div>
			)}
		</div>
	);
};

export default Page;
