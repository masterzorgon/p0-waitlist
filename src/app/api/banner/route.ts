import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const { username, email } = await req.json();

    // Fetch Twitter profile pic
    const profilePic = `https://unavatar.io/twitter/${username}`;

    // Check if the profile image exists
    const profileResponse = await fetch(profilePic);
    if (!profileResponse.ok) {
      return NextResponse.json({
        success: false,
        error: "Could not find Twitter profile for the given username"
      }, { status: 400 });
    }

    const imgBuffer = await profileResponse.arrayBuffer();

    // Overlay onto template
    const template = sharp("./public/template.png");
    // First, resize the Twitter PFP
    const resizedPfp = await sharp(Buffer.from(imgBuffer))
      .resize(300, 300)
      .png()
      .toBuffer();

    // Create a rounded corner mask (300x300, radius 200)
    const roundedMask = Buffer.from(
      `<svg width="300" height="300">
        <rect x="0" y="0" width="300" height="300" rx="200" ry="200" />
      </svg>`
    );

    // Apply the mask to the PFP
    const roundedPfp = await sharp(resizedPfp)
      .composite([{ input: roundedMask, blend: "dest-in" }])
      .png()
      .toBuffer();

    // Composite onto the template
    const composite = await template
      .composite([
        { input: roundedPfp, top: 345, left: 354 } // shifted up 10, right 10
      ])
      .png()
      .toBuffer();

    // Encode as base64 string
    const base64Img = composite.toString("base64");

    // If email is provided and valid, add to newsletter
    if (email) {
      try {
        const newsletterResponse = await fetch(`${req.nextUrl.origin}/api/newsletter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!newsletterResponse.ok) {
          const errorData = await newsletterResponse.json();
          console.warn("Newsletter subscription failed:", errorData);
          // Continue with banner generation even if newsletter fails
        }
      } catch (newsletterError) {
        console.warn("Newsletter subscription error:", newsletterError);
        // Continue with banner generation even if newsletter fails
      }
    }

    // Return success response with both the generated image and profile info
    return NextResponse.json({
      success: true,
      image: base64Img,
      profileImage: profilePic,
      username: username
    });
  } catch (err) {
    console.error("Error generating image:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
