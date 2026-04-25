'use client';

import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className="h-24">
            <nav className="fixed z-50 top-0 left-0 right-0 w-full py-3 sm:py-4">
                <div className="z-40 w-full mx-auto px-4 sm:px-5">
                    <div className="w-full bg-white/70 backdrop-blur-md text-alpha border-b mx-auto max-w-[128rem] rounded-3xl">
                        <div className="max-w-[128rem] mx-auto">
                            <div className="h-14 md:h-16 px-4 sm:px-5 py-2 flex items-center justify-between gap-3 transition">
                                <Link
                                    className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled flex-shrink-0 flex items-center gap-2 select-none hover:drop-shadow-md hover:scale-105 transition"
                                    href="/"
                                    tabIndex={0}
                                    role="link">
                                    <div
                                        className="relative shadow-black/5 shadow-none rounded-none"
                                        style={{ maxWidth: '30px' }}>
                                        <Image
                                            src="https://ai-tutor.ai/icons/AI%20Tutor%20Logo.svg"
                                            className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-none size-6 md:size-8 flex-shrink-0"
                                            height="32"
                                            width="30"
                                            alt="Logo"
                                            style={{ height: '32px' }}
                                            data-loaded="true"
                                        />
                                    </div>
                                    <div className="font-albra text-xl md:text-3xl font-bold flex-shrink-0 text-black tracking-wide mt-1.5">
                                        AI Tutor
                                    </div>
                                </Link>
                                <div className="hidden md:flex items-center gap-6 mr-11">
                                    <Link
                                        className="inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-black relative font-beta after:content-normal after:absolute after:left-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-beta hover:after:w-full after:transition-all after:w-3/4"
                                        href="/"
                                        tabIndex={0}
                                        role="link">
                                        Home
                                    </Link>
                                    <button
                                        className="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 rounded-small [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased p-0 bg-transparent data-[hover=true]:bg-transparent text-black font-beta text-base"
                                        type="button"
                                        data-slot="trigger"
                                        id="react-aria-:R2inpaja:"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        AI Homework Assistants
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 16 16"
                                            aria-hidden="true"
                                            focusable="false"
                                            tabIndex={-1}
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className="group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 rounded-small [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased p-0 bg-transparent data-[hover=true]:bg-transparent text-black font-beta text-base"
                                        type="button"
                                        data-slot="trigger"
                                        id="react-aria-:R3inpaja:"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        B2B Solutions
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 16 16"
                                            aria-hidden="true"
                                            focusable="false"
                                            tabIndex={-1}
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                                        </svg>
                                    </button>
                                    <a
                                        className="inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-black relative font-beta after:content-normal after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:rounded-full after:bg-beta hover:after:w-full after:transition-all"
                                        href="/pricing"
                                        tabIndex={0}
                                        role="link">
                                        Pricing
                                    </a>
                                    <a
                                        className="inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-black relative font-beta after:content-normal after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:rounded-full after:bg-beta hover:after:w-full after:transition-all"
                                        href="/about-us"
                                        tabIndex={0}
                                        role="link">
                                        About
                                    </a>
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex flex-col-reverse md:flex-row items-stretch md:items-center mt-10 md:mt-0 gap-3 md:gap-0.5 transition">
                                        <button
                                            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-16 h-8 gap-2 rounded-full [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-secondary text-secondary-foreground data-[hover=true]:opacity-hover font-beta text-base px-5 py-5 md:py-4"
                                            type="button">
                                            Log In
                                        </button>
                                    </div>
                                </div>
                                <div className="block md:hidden">
                                    <div className="z-30">
                                        <button
                                            className="flex flex-col gap-1 px-0"
                                            aria-label="Toggle navigation menu">
                                            <div className="w-5 h-0.5 bg-alpha rounded-full transition-transform rotate-0 translate-y-0"></div>
                                            <div className="w-5 h-0.5 bg-alpha rounded-full transition-opacity opacity-100"></div>
                                            <div className="w-5 h-0.5 bg-alpha rounded-full transition-transform rotate-0 translate-y-0"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
