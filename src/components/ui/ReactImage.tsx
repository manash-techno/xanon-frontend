import { CSSProperties, ImgHTMLAttributes, JSX, useEffect, useState } from "react";
import { AssetsConfig } from "@/config/assetsConfig.ts";

interface iImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    placeholder?: "blur" | "skeleton" | "none";
    fallbackSrc?: string;
    aspectRatio?: string;
    invertColor?: boolean;
    style?: CSSProperties;
}

/**
 * 🚀 Advanced Image Component with Smooth Transitions & Fallback Handling
 */
export const ReactImage = ({
                               src,
                               alt = AssetsConfig.icons.fallbackImage.alt,
                               width,
                               height,
                               className = "",
                               placeholder = "none",
                               fallbackSrc = AssetsConfig.icons.fallbackImage.src,
                               aspectRatio,
                               invertColor = false,
                               style = {},
                               ...props
                           }: iImageProps): JSX.Element => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    // Merge styles for smooth transition effects
    const mergedStyle: CSSProperties = {
        transition: "opacity 0.5s ease-in-out, transform 0.3s ease-in-out",
        opacity: isLoading ? 0 : 1,
        transform: isLoading ? "scale(1.05)" : "scale(1)", // Slight zoom effect on load
        ...style,
    };

    // Apply invert color filter if enabled
    if (invertColor) {
        mergedStyle.filter = mergedStyle.filter ? `${mergedStyle.filter} invert(1)` : "invert(1)";
    }

    // Preload image before updating `imageSrc`
    useEffect(() => {
        setIsLoading(true);
        setHasError(false);

        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
        };
        img.onerror = () => {
            setImageSrc(fallbackSrc);
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    return (
        <div
            className={`relative overflow-hidden ${aspectRatio ? `aspect-[${aspectRatio}]` : ""}`}
            style={{ width, height }}
        >
            {/* Placeholder Effect: Blur, Skeleton, or None */}
            {isLoading && placeholder !== "none" && (
                <div
                    className={`absolute inset-0 flex items-center justify-center ${
                        placeholder === "blur" ? "bg-gray-300 animate-pulse" : "bg-gray-200"
                    }`}
                ></div>
            )}

            {/* Actual Image or Fallback Image */}
            <img
                src={imageSrc}
                alt={alt}
                className={`transition-opacity duration-500 ease-in-out ${className}`}
                style={mergedStyle}
                {...props}
            />
        </div>
    );
};
