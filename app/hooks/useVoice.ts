"use client";

import { useEffect, useRef, useState } from "react";
import { stopSpeaking } from "./useSpeech";

export function useVoice(
  onFinalText: (text: string) => void,
  onInterimText?: (text: string) => void
) {
  const recognitionRef = useRef<any>(null);

  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      stopSpeaking();
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (interim && onInterimText) {
        onInterimText(interim);
      }

      if (final) {
        const cleaned = final.trim();
        console.log("VOICE:", cleaned);
        onFinalText(cleaned);
      }
    };

    recognition.onerror = (event: any) => {
      console.log("VOICE ERROR:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const start = () => {
    try {
      recognitionRef.current?.start();
    } catch {}
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return { start, stop, listening, supported };
}