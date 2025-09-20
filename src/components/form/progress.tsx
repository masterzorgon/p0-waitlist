'use client'

import { cn } from "@/lib/utils";
import { stepConfigs } from "./form";

interface ProgressProps {
    currentStep: number;
}

export const Progress = ({ currentStep }: ProgressProps) => {
    return (
        <nav aria-label="Progress" className="mx-auto max-w-2xl">
            <ol className="space-y-0 md:flex md:space-y-0 md:space-x-8">
                {stepConfigs.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        {step.id <= currentStep ? (
                            <div
                                className={cn("flex group pl-4 py-2 flex-col border-l-4 border-vangardPurple md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4", step.id - currentStep !== 0 && "hidden sm:flex")}
                            >
                                <span className="text-xs text-vangardPurple font-semibold tracking-wide uppercase">
                                    {step.name}
                                </span>
                                <span className="text-sm font-medium">{step.name}</span>
                            </div>
                        ) : (
                            <div
                                className="hidden sm:flex group pl-4 py-2 flex-col border-l-4 border-gray-200 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                            >
                                <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
                                    {step.name}
                                </span>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
