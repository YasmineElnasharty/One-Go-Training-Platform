'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, MicOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ChatPage() {
    const router = useRouter();
    const [isRecording, setIsRecording] = useState(false);
    const [assistantMessage, setAssistantMessage] = useState('');
    const [displayedMessage, setDisplayedMessage] = useState('');
    const [status, setStatus] = useState<'initial' | 'listening' | 'processing' | 'responding' | 'idle'>('initial');

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // Typing effect for the assistant's messages
    useEffect(() => {
        let index = 0;
        let interval: NodeJS.Timeout;
        if (assistantMessage) {
            setDisplayedMessage('');
            interval = setInterval(() => {
                setDisplayedMessage((prev) => prev + assistantMessage.charAt(index));
                index++;
                if (index >= assistantMessage.length) {
                    clearInterval(interval);
                }
            }, 50); // typing speed
        } else {
            setDisplayedMessage('');
        }
        return () => clearInterval(interval);
    }, [assistantMessage]);

    // Function to handle text-to-speech and display
    const processAudio = async (audioBlob: Blob) => {
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob);
    
            const response = await fetch(`${API_URL}/speak`, {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`Request failed: ${response.statusText}`);
            }
    
            setStatus('responding');
            const audioBlobResponse = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlobResponse);
            const audio = new Audio(audioUrl);
    
            // Get and decode the base64 encoded text response
            const encodedText = response.headers.get('X-Response-Text');
            if (encodedText) {
                const decodedText = atob(encodedText);
                setAssistantMessage(decodedText);
            } else {
                setAssistantMessage('No response received');
            }
    
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch((err) => {
                    console.warn('Video play failed:', err);
                });
            }
    
            audio.onended = () => {
                setStatus('idle');
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
                URL.revokeObjectURL(audioUrl);
            };
    
            audio.onerror = (err) => {
                console.error('Audio play failed:', err);
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
                URL.revokeObjectURL(audioUrl);
                setStatus('idle');
            };
    
            await audio.play();
        } catch (error) {
            console.error('Error processing audio or fetching response:', error);
            setAssistantMessage('I encountered an error. Please try again.');
            setStatus('idle');
        }
    };
    

    // Start recording audio or handle initial interaction
    const startRecording = async () => {
        try {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }

            // If it's the initial state, show the greeting message
            if (status === 'initial') {
                const initialMessage = "Hello There, Welcome to the world of corporate training. I will be your guide for today";
                await speakAndDisplayMessage(initialMessage);
                return;
            }

            setStatus('listening');

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            chunks.current = [];
            mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
                await processAudio(audioBlob);
            };
            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Failed to access the microphone.');
            setStatus('idle');
        }
    };

    // Stop recording audio
    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            setStatus('processing');
        }
    };

    // Process recorded audio and get response
    const speakAndDisplayMessage = async (message: string) => {
        try {
            const response = await fetch(`${API_URL}/speak`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: message
            });
    
            if (!response.ok) {
                throw new Error(`Request failed: ${response.statusText}`);
            }
    
            setStatus('responding');
            const audioBlobResponse = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlobResponse);
            const audio = new Audio(audioUrl);
    
            // Get and decode the base64 encoded text response
            const encodedText = response.headers.get('X-Response-Text');
            if (encodedText) {
                const decodedText = atob(encodedText);
                setAssistantMessage(decodedText);
            } else {
                setAssistantMessage(message); // Fallback to original message
            }
    
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch((err) => {
                    console.warn('Video play failed:', err);
                });
            }
    
            audio.onended = () => {
                setStatus('idle');
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
                URL.revokeObjectURL(audioUrl);
            };
    
            await audio.play();
        } catch (error) {
            console.error('Error in speaking message:', error);
            setAssistantMessage(message); // Still show the message even if speech fails
            setStatus('idle');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
            {/* Background decorative elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50 via-white to-white"></div>
                <motion.div
                    className="absolute w-48 h-48 bg-green-100 rounded-full top-10 left-10 filter blur-xl opacity-40"
                    animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                    className="absolute w-32 h-32 bg-green-200 rounded-full bottom-20 right-20 filter blur-lg opacity-30"
                    animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
            </motion.div>

            {/* Top navigation with Back button */}
            <div className="absolute top-4 left-4 flex items-center space-x-4">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back to Skills</span>
                </motion.button>
            </div>

            {/* Assistant Avatar */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-6 z-10"
            >
                <div className="relative w-80 h-80 rounded-full overflow-hidden bg-white border-4 border-green-500 shadow-lg">
                    <video
                        ref={videoRef}
                        src="https://www.media.io/video/face-animator-ai.mp4"
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-green-300 opacity-50 animate-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    ></motion.div>
                </div>

                {/* Assistant Message Display */}
                {displayedMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative max-w-md px-6 py-4 rounded-xl shadow-lg"
                        style={{
                            background: 'linear-gradient(to bottom right, #c7f5d6, #f0fdf4)',
                        }}
                    >
                        <div
                            className="absolute -bottom-2 left-10 w-5 h-5 bg-white transform rotate-45 border border-green-300"
                            style={{ background: 'linear-gradient(to bottom right, #c7f5d6, #f0fdf4)' }}
                        ></div>

                        <p className="text-green-900 font-semibold text-lg leading-relaxed text-center">
                            {displayedMessage}
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* Status and Record Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center space-y-4 mt-10 z-10"
            >
                {status === 'listening' && (
                    <div className="text-gray-700 font-medium">Listening...</div>
                )}
                {status === 'processing' && (
                    <div className="text-gray-700 font-medium">Processing...</div>
                )}
                {status === 'responding' && (
                    <div className="text-gray-700 font-medium">Responding...</div>
                )}

                <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={status === 'processing' || status === 'responding'}
                    className={`inline-flex items-center justify-center rounded-full text-lg font-semibold text-white transition-all duration-300 w-20 h-20 ${
                        isRecording
                            ? 'bg-red-600 hover:bg-red-700'
                            : status === 'processing' || status === 'responding'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
                    }`}
                >
                    {isRecording ? (
                        <MicOff className="w-8 h-8 text-white" />
                    ) : (
                        <Mic className="w-8 h-8 text-white" />
                    )}
                </button>
            </motion.div>
        </div>
    );
}