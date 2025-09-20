'use client'

import { Nodes } from "@/components/nodes";
import { GradientText } from "@/components/gradient-text";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

export function Header() {
    return (
        <div className="relative border-2 border-red-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/images/backgrounds/main.svg"
                alt="Nodes"
                width={768}
                className="absolute top-0 left-0 lg:hidden"
            />
            <Nodes />
            <div className="mx-auto w-full max-w-[var(--p0-container-width)] px-4 md:px-6">
                <header className="mx-auto flex w-full items-center justify-center pt-9 md:pt-18 md:pb-6">
                    <div className="relative">
                        <div className="bg-background absolute top-1/2 left-1/2 h-[160px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-lg blur-[40px] sm:w-[350px] md:w-[400px] lg:h-[244px] lg:w-[555px]"></div>
                        <div className="relative flex flex-col items-center justify-center space-y-2 md:space-y-4">
                            <GradientText className="text-center text-4xl md:text-5xl lg:text-6xl">
                                Apply for <br />Early Access
                            </GradientText>
                            <p className="mx-auto text-center text-black md:text-lg lg:text-2xl">
                                Early access will be granted at Project 0's discretion. <br />
                                <span>Thank you for your interest!</span>
                            </p>
                            <div className="mt-4">
                                <a href="https://blog.0.xyz/" target="_blank" rel="noopener noreferrer" className="inline-flex space-x-6">
                                    <span className="rounded-full bg-vangardPurple/10 px-3 py-1 text-sm/6 font-semibold text-vangardPurple ring-1 ring-indigo-600/20 ring-inset">
                                        Learn more
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-950">
                                        <span>Read the announcement</span>
                                        <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
