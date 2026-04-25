'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function SessionPage() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [micOn, setMicOn] = useState(true);
    const [aiMuted, setAiMuted] = useState(false);

    const generateSessionId = () => {
        const part = () => Math.random().toString(36).substring(2, 5);
        return `${part()}-${part()}-${part()}`;
    };
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const id = generateSessionId();
        setSessionId(id);
        setTime(
            new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        );

        const url = process.env.NEXT_PUBLIC_WS_URL;
        if (!url) return;

        const socket = new WebSocket(url);

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        setWs(socket);
        const urlObj = new URL(window.location.href);
        urlObj.searchParams.set('session', id);
        window.history.replaceState({}, '', urlObj.toString());

        return () => socket.close();
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.topBar}>
                    <div>AI Tutor Session</div>
                    <div className={styles.topBarRight}>
                        <div className={styles.avatar}>A</div>
                    </div>
                </div>

                <div className={styles.stageWrapper}>
                    <div className={styles.stage}>
                        <div className={styles.aiText}>AI</div>

                        <div className={styles.stageOverlay} />
                    </div>
                </div>

                <div className={styles.bottomBarWrapper}>
                    <div className={styles.bottomBar}>
                        <div className={styles.time}>
                            <span suppressHydrationWarning>
                                {time || '--:--'}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                {sessionId || 'loading'}
                            </span>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.tooltipWrapper}>
                                <button
                                    onClick={() => setMicOn(!micOn)}
                                    className={`${styles.controlBtn} ${!micOn ? styles.off : ''}`}>
                                    {micOn ? '🎤' : '🔇'}
                                </button>
                                <span className={styles.tooltip}>Mic</span>
                            </div>
                            <div className={styles.tooltipWrapper}>
                                <button
                                    onClick={() => setAiMuted(!aiMuted)}
                                    className={`${styles.controlBtn} ${aiMuted ? styles.off : ''}`}>
                                    {aiMuted ? '🤖❌' : '🤖'}
                                </button>
                                <span className={styles.tooltip}>Mute AI</span>
                            </div>
                            <div className={styles.tooltipWrapper}>
                                <button
                                    onClick={() => setChatOpen(!chatOpen)}
                                    className={styles.controlBtn}>
                                    💬
                                </button>
                                <span className={styles.tooltip}>Chat</span>
                            </div>
                            <div className={styles.tooltipWrapper}>
                                <button className={styles.controlBtn}>⋮</button>
                                <span className={styles.tooltip}>More</span>
                            </div>
                        </div>

                        <div className={styles.rightControls}>
                            <div className={styles.tooltipWrapper}>
                                <button
                                    onClick={() => {
                                        if (ws) {
                                            ws.close();
                                        }
                                        window.location.href = '/';
                                    }}
                                    className={styles.leaveBtn}>
                                    📞
                                </button>
                                <span className={styles.tooltip}>
                                    Leave call
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.chat} ${chatOpen ? styles.open : ''}`}>
                <div className={styles.chatHeader}>
                    <p className={styles.chatTitle}>In-call messages</p>
                    <button
                        onClick={() => setChatOpen(false)}
                        className={styles.closeBtn}>
                        ✕
                    </button>
                </div>

                <div className={styles.messages}>
                    {messages.length === 0 && (
                        <div className={styles.empty}>No messages yet</div>
                    )}
                    {messages.map((msg, i) => (
                        <div key={i} className={styles.message}>
                            {msg}
                        </div>
                    ))}
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.inputWrap}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && ws && input.trim()) {
                                    ws.send(input);
                                    setMessages((prev) => [
                                        ...prev,
                                        `You: ${input}`,
                                    ]);
                                    setInput('');
                                }
                            }}
                            placeholder="Send a message"
                            className={styles.input}
                        />
                        <button
                            onClick={() => {
                                if (ws && input.trim()) {
                                    ws.send(input);
                                    setMessages((prev) => [
                                        ...prev,
                                        `You: ${input}`,
                                    ]);
                                    setInput('');
                                }
                            }}
                            className={styles.sendBtn}>
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
