"use client";

let audio: HTMLAudioElement | null = null;

const API_KEY = "YOUR_API_KEY";
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

export async function speak(text: string) {
  if (!text) return;

  try {
    stopSpeaking();

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
        }),
      }
    );

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    audio = new Audio(url);
    await audio.play();

  } catch (e) {
    console.log("Speech error", e);
  }
}

export function stopSpeaking() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}