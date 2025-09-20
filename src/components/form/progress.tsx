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
                {stepConfigs.map((step) => {
                    const isActive = step.id <= currentStep;
                    const isCurrent = step.id === currentStep;
                    
                    return (
                        <li key={step.name} className="md:flex-1">
                            <div className={cn(
                                "flex group pl-4 py-2 flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4",
                                "transition-all duration-300 ease-in-out",
                                isActive 
                                    ? "border-vangardPurple" 
                                    : "border-gray-200",
                                !isCurrent && !isActive && "hidden sm:flex",
                                isCurrent && "sm:flex"
                            )}>
                                <span className={cn(
                                    "text-xs font-semibold tracking-wide uppercase",
                                    "transition-colors duration-300 ease-in-out",
                                    isActive 
                                        ? "text-vangardPurple" 
                                        : "text-gray-500"
                                )}>
                                    {step.name}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
