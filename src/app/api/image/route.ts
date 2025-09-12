import { NextRequest, NextResponse } from "next/server";
import { imageStorage } from "../banner/route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const imageData = imageStorage.get(id);
    
    if (!imageData) {
      return new NextResponse("Image not found or expired", { status: 404 });
    }

    // Return the image with proper headers
    return new NextResponse(new Uint8Array(imageData.image), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="p0-banner-${imageData.username}.png"`,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (err) {
    console.error("Error serving image:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}