"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();
	console.log(session, " session");
	useEffect(() => {
		setLoading(true);
		if (session && session.user) router.push("/");

		setLoading(false);
	}, []);
	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			await signIn("google", { callbackUrl: "/" });
		} catch (error) {
			console.error("Google sign-in failed: ", error);
			setError("Google sign-in failed.");
		} finally {
			setLoading(false);
		}
	};

	const handleCredentialsSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else {
			router.push("/dashboard");
		}
		setLoading(false);
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center sm:gap-x-4">
			<div className="hidden sm:block w-1/2">
				{/* <Image
					src="https://res.cloudinary.com/degrggosz/image/upload/v1746781128/Web__What-is-Bussines-Analytics_je92qe.webp"
					width={300}
					height={300}
					className="h-auto w-full"
					alt="login image"
				/> */}
				<Image
					src="https://res.cloudinary.com/degrggosz/image/upload/v1746809258/ChatGPT_Image_May_9_2025_10_17_17_PM_iqfzqr.png"
					width={400}
					height={600}
					alt="Responsive image"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="h-auto w-full"
				/>
			</div>
			<div className="flex-1 max-w-md bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

				{error && <p className="text-red-500 text-center">{error}</p>}

				<button
					onClick={handleGoogleSignIn}
					className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 mb-4"
					disabled={loading}>
					<FcGoogle className="text-2xl" />
					{loading ? "Signing in..." : "Continue with Google"}
				</button>

				<div className="relative my-4 text-center">
					<span className="bg-white px-2 text-gray-500">or</span>
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
				</div>

				<form onSubmit={handleCredentialsSignIn} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full border border-gray-300 p-2 rounded-lg focus:outline-hidden focus:ring-3 focus:ring-blue-300"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className="w-full border border-gray-300 p-2 rounded-lg focus:outline-hidden focus:ring-3 focus:ring-blue-300"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-3 flex items-center text-gray-500">
							{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</button>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
						disabled={loading}>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
				<p className=" text-xs mt-1">
					{`Don't have an account yet? `}
					<Link className="text-red-500" href="/register">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
