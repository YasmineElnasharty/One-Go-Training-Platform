// Declare SpeechRecognition and its related types for TypeScript
interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

declare var SpeechRecognition: {
    new(): SpeechRecognition;
};

declare var webkitSpeechRecognition: {
    new(): SpeechRecognition;
};

interface SpeechRecognition {
    lang: string;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionError) => void) | null;
    onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognitionError extends Event {
    error: string;
    message?: string;
}
