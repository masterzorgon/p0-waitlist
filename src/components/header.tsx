'use client'

import { Nodes } from "@/components/nodes";
import { GradientText } from "@/components/gradient-text";

export function Header() {
    return (
        <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/images/backgrounds/main.svg"
                alt="Nodes"
                width={768}
                className="absolute top-0 left-0 lg:hidden"
            />
            <Nodes />
            <div className="mx-auto w-full max-w-[var(--p0-container-width)] px-4 md:px-6">
                <header className="mx-auto flex w-full items-center justify-center pt-9 md:pt-18">
                    <div className="relative">
                        <div className="bg-background absolute top-1/2 left-1/2 h-[160px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-lg blur-[40px] sm:w-[350px] md:w-[400px] lg:h-[244px] lg:w-[555px]"></div>
                        <div className="relative flex flex-col items-center justify-center space-y-2 md:space-y-4">
                            <GradientText className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl">
                                Apply for <br />Early Access
                            </GradientText>

                            <div className="flex fixed top-6 sm:top-0 left-0 right-0 z-50 relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 rounded-lg shadow-sm">
                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                                        }}
                                        className="aspect-577/310 w-144.25 bg-linear-to-r from-deepBlue/50 via-vangardPurple/50 to-lightBlue/50 opacity-30"
                                    />
                                </div>
                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                                        }}
                                        className="aspect-577/310 w-144.25 bg-linear-to-r from-deepBlue/50 via-vangardPurple/50 to-lightBlue/50 opacity-30"
                                    />
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <p className="text-xs/4 sm:text-sm/6 text-gray-900 flex items-center">
                                        <img
                                            src="/images/logos/kamino.png"
                                            alt="Kamino"
                                            className="h-4 w-4 mr-2 inline-block"
                                        />
                                        <strong className="font-semibold">Kamino Main Market is coming to Project 0 in October</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
