// types/speech.d.ts
interface Window {
	webkitSpeechRecognition: typeof SpeechRecognition;
}

declare const webkitSpeechRecognition: {
	prototype: SpeechRecognition;
	new (): SpeechRecognition;
};
