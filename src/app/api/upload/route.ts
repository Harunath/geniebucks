import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { image, public_id } = await req.json(); // Fetch the image and public_id from the request

	try {
		const uploadResult = await upload(image, public_id);
		console.log(uploadResult);
		return NextResponse.json({ imageUrl: uploadResult }, { status: 200 });
	} catch (error) {
		console.error("Upload Error: ", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

async function upload(image: string, public_id: string) {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		// Upload image to Cloudinary
		const date = JSON.stringify(new Date());
		const uploadResult = await cloudinary.uploader.upload(image, {
			public_id: `${public_id + date}`,
		});

		// Return the URL for optimized delivery
		return cloudinary.url(uploadResult.public_id, {
			fetch_format: "auto",
			quality: "auto",
		});
	} catch (error) {
		console.error("Cloudinary Upload Error: ", error);
		throw new Error("Failed to upload image to Cloudinary.");
	}
}
