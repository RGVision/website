export const cloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
};

export function getCloudinaryUrl(publicId: string, options: { width?: number; height?: number; quality?: string; format?: string } = {}): string {
    const { width = 800, height = 600, quality = "auto", format = "auto" } = options;
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
}

export function getOptimizedImageProps(src: string, alt: string) {
    return { src, alt, loading: "lazy" as const };
}
