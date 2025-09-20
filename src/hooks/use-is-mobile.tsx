"use client";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

export function useIsMobile(breakpoint = 768) {
    // Initialize as false to match server-side rendering
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        // Use matchMedia API which is more reliable than window.innerWidth
        // especially in mobile/wallet browsers
        const mediaQuery = `(max-width: ${breakpoint - 1}px)`;

        // Check if matchMedia is available (it should be in all modern browsers)
        if (typeof window !== "undefined" && window.matchMedia) {
            const mediaQueryList = window.matchMedia(mediaQuery);

            // Set initial state
            setIsMobile(mediaQueryList.matches);

            // Create debounced event handler
            const handleChange = debounce((event: MediaQueryListEvent) => {
                setIsMobile(event.matches);
            }, 250);

            // Add listener
            mediaQueryList.addEventListener("change", handleChange);

            // Cleanup
            return () => mediaQueryList.removeEventListener("change", handleChange);
        } else {
            // Fallback for environments where matchMedia is not available
            // This is extremely rare but provides a safety net
            const checkWidth = () => {
                if (typeof window !== "undefined" && window.innerWidth) {
                    setIsMobile(window.innerWidth < breakpoint);
                }
            };

            const debouncedCheckWidth = debounce(checkWidth, 250);

            checkWidth();
            window.addEventListener("resize", debouncedCheckWidth);
            return () => window.removeEventListener("resize", debouncedCheckWidth);
        }
    }, [breakpoint]);

    // Return false during SSR and initial render to prevent hydration mismatch
    return isHydrated ? isMobile : false;
}