import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	try {
		const { link } = await request.json();
		const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY!); // API key from env variable

		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use "gemini-pro" (no "models/" prefix)

		const imageResponse = await fetch(link);

		if (!imageResponse.ok) {
			throw new Error(
				`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`
			);
		}

		const imageBuffer = await imageResponse.arrayBuffer();

		const result = await model.generateContent([
			{
				inlineData: {
					data: Buffer.from(imageBuffer).toString("base64"),
					mimeType: "image/jpeg", // Ensure correct MIME type
				},
			},
			"Caption this image.", // Or a more descriptive prompt
		]);

		if (!result.response) {
			console.error("Gemini API Error:", result);
			throw new Error("Gemini API returned an unexpected response.");
		}

		console.log(result.response.text());
		return NextResponse.json(
			{ result: result.response.text() },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
