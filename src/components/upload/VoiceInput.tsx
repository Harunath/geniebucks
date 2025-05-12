"use client";

import { useRef, useState } from "react";

// Define SpeechRecognition types if not globally available
type SpeechRecognition = typeof window extends {
	webkitSpeechRecognition: infer T;
}
	? T extends new () => infer R
		? R
		: never
	: never;

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

type Props = {
	onResult: (text: string) => void;
};

export default function VoiceInput({ onResult }: Props) {
	const [listening, setListening] = useState(false);
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	const startListening = () => {
		if (typeof window === "undefined") {
			console.error("Window is undefined");
			return;
		}

		const SpeechRecognitionClass =
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).SpeechRecognition ||
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).webkitSpeechRecognition;

		if (!SpeechRecognitionClass) {
			console.error("SpeechRecognition not supported in this browser.");
			return;
		}

		const recognition: SpeechRecognition = new SpeechRecognitionClass();
		recognition.interimResults = false;
		recognition.continuous = false;
		recognition.maxResults = 1;

		recognition.onstart = () => {
			console.log("recording started");
		};

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const transcript = event.results[0][0].transcript;
			console.log("Transcript:", transcript);
			onResult(transcript);
			setListening(false);
		};

		recognition.onerror = (e: Event) => {
			console.error("Recognition error:", e);
			setListening(false);
		};

		recognition.onend = () => {
			console.log(recognition);
			setListening(false);
		};

		recognitionRef.current = recognition;
		recognition.start();
		setListening(true);
	};

	return (
		<button
			onClick={startListening}
			className="bg-blue-500 text-white px-4 py-2 rounded">
			🎤 {listening ? "Listening..." : "Start Voice Input"}
		</button>
	);
}
