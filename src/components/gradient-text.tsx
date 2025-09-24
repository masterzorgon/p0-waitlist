import React from "react";

import { cn } from "@/lib/utils";

type GradientTextProps = {
    children: React.ReactNode;
    className?: string;
};

export const GradientText = ({ children, className }: GradientTextProps) => {
    return (
        <div
            className={cn("inline-block py-1 text-4xl font-medium", className)}
            style={{
                background:
                    "linear-gradient(270deg, #8C6D1E 40%, #797044 75%, #3F3F3E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
        >
            {children}
        </div>
    );
};
