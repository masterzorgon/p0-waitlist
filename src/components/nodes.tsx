"use client";

import React from "react";

import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks";

const dimensions = {
    main: { width: 2560, height: 395 },
    detail: { width: 2560, height: 300 },
    footer: { width: 2560, height: 260 },
    orb: { width: 1407, height: 1340 },
};

type NodesProps = {
    animation?: keyof typeof dimensions;
};

const Nodes = ({ animation = "main" }: NodesProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const isMobile = useIsMobile();

    const handleDotLottieRef = React.useCallback((dotLottie: DotLottie) => {
        if (dotLottie) {
            dotLottie.addEventListener("play", () => {
                setIsLoaded(true);
            });
        }
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <div
            className={cn(
                "absolute inset-0 top-0 left-1/2 hidden -translate-x-1/2 opacity-0 transition-opacity duration-1000 lg:block",
                isLoaded && animation !== "footer" && "opacity-100",
                isLoaded && animation === "footer" && "opacity-60",
                animation === "orb" && "top-1/2 -translate-y-1/2",
                animation === "footer" && "top-auto bottom-0",
                (animation === "main" || animation === "detail") && "-top-8",
            )}
            style={{
                width: dimensions[animation].width + "px",
                height: dimensions[animation].height + "px",
            }}
        >
            {(animation === "main" || animation === "detail") && (
                <div
                    className={cn(
                        "to-background absolute top-0 left-0 hidden h-full w-[300px] bg-gradient-to-l from-transparent min-[2000px]:block",
                        animation === "main" && "left-[200px]",
                        animation === "detail" && "left-0",
                    )}
                />
            )}
            <DotLottieReact
                src={`/lottie/${animation}.json`}
                loop
                autoplay
                speed={0.25}
                dotLottieRefCallback={handleDotLottieRef}
            />
            {(animation === "main" || animation === "detail") && (
                <div
                    className={cn(
                        "to-background absolute top-0 right-0 hidden h-full w-[300px] bg-gradient-to-r from-transparent min-[2000px]:block",
                        animation === "main" && "right-[200px]",
                        animation === "detail" && "right-0",
                    )}
                />
            )}
        </div>
    );
};

export { Nodes };