'use client';

import Link from 'next/link';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className="w-full pt-10 md:pt-24 hero-section">
            <div className="relative z-10 w-full max-w-[84rem] mx-auto px-5 flex flex-col items-center gap-4">
                <h1 className="text-5xl text-center __classNameName_289dad">
                    <span className="font-extralight">
                        Next Level AI Tutoring
                    </span>
                    <br />
                    <span className="font-light">For Lifelong Learners</span>
                </h1>
                <p className="max-w-md px-4 text-center">
                    Create a custom learning pathway to help you achieve more in
                    school, work, and life.
                </p>
                <a
                    className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled transition-opacity z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-24 h-12 [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover flex items-center gap-1.5 bg-beta rounded-3xl px-8 py-6 text-white text-sm md:text-base group my-5"
                    href="/dashboard"
                    role="button">
                    Start Learning with AI
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 16 16"
                        className="group-hover:translate-x-1 transition"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                    </svg>
                </a>
                <div className="hidden md:flex flex-col items-center gap-3 mb-8">
                    <div className="font-medium">
                        Also for Businesses and Institutions
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <a
                            className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover bg-beta-100 border border-alpha/15 rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:border-alpha/30 hover:drop-shadow-md text-sm sm:text-base transition"
                            href="/whitelabel-ai-training"
                            role="button">
                            White-label
                        </a>
                        <a
                            className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover bg-beta-100 border border-alpha/15 rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:border-alpha/30 hover:drop-shadow-md text-sm sm:text-base transition"
                            href="/ai-corporate-training"
                            role="button">
                            AI for Corporate Training
                        </a>
                        <a
                            className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover bg-beta-100 border border-alpha/15 rounded-full px-3 md:px-5 py-1.5 md:py-2 hover:border-alpha/30 hover:drop-shadow-md text-sm sm:text-base transition"
                            href="/ai-for-educators"
                            role="button">
                            AI for Educators
                        </a>
                    </div>
                </div>
                {/* <div className="flex flex-col sm:flex-row items-center gap-3 text-beta cursor-pointer hover:drop-shadow-md">
                    <img
                        alt="Play"
                        fetchpriority="high"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        style="color: transparent"
                        src="/icons/play-blue.svg"
                    />
                    <span className="text-center text-sm sm:text-base underline font-inter font-medium">
                        AI Tutor explained in 165 seconds
                    </span>
                </div> */}
            </div>
        </section>
    );
}
