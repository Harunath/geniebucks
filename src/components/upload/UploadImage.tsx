"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { getGoogleGenerativeAI } from "@/lib/gemini";

export default function ImageUpload() {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [text, setText] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleUpload = async () => {
		if (!image) return alert("Please select an image");

		const formData = new FormData();
		formData.append("file", image);

		setUploading(true);

		try {
			const { data } = await axios.post("/api/upload", formData);
			setImageUrl(data.secure_url);
			const text = await getGoogleGenerativeAI({ link: data.secure_url });
			setText(text);
		} catch (error) {
			console.error("Upload error:", error);
			alert("Image upload failed");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="p-6">
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="mb-4"
			/>

			{preview && (
				<Image
					src={preview}
					alt="Preview"
					className="w-40 h-40 object-cover mb-4"
					width={160}
					height={160}
				/>
			)}

			<button
				onClick={handleUpload}
				disabled={uploading}
				className="bg-blue-500 text-white px-4 py-2 rounded-md">
				{uploading ? "Uploading..." : "Upload"}
			</button>

			{imageUrl && (
				<div className="mt-4">
					<p>Image URL:</p>
					<a
						href={imageUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600">
						{imageUrl}
					</a>
				</div>
			)}
			{text && <p>{text}</p>}
		</div>
	);
}
