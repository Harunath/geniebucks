import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGoogleGenerativeAI = async ({ link }: { link: string }) => {
	try {
		console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
		const genAI = new GoogleGenerativeAI(
			process.env.NEXT_PUBLIC_GEMINI_API_KEY!
		); // API key from env variable

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
		return result.response.text();
	} catch (error) {
		console.error("Error in getGoogleGenerativeAI:", error);
		throw error; // Re-throw the error for handling by the caller
	}
};
