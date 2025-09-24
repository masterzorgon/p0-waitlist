import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        const { username, mutual } = await req.json();

        const profilePic = `https://unavatar.io/twitter/${username}`;

        const profileResponse = await fetch(profilePic);
        if (!profileResponse.ok) {
            return NextResponse.json({
                success: false,
                error: "Could not find Twitter profile for the given username"
            }, { status: 400 });
        }

        const imgBuffer = await profileResponse.arrayBuffer();


        const template = sharp("../../../public/images/backgrounds/template.png");

        const resizedPfp = await sharp(Buffer.from(imgBuffer))
            .resize(300, 300)
            .png()
            .toBuffer();

        // make a rounded corner mask (300x300, radius 200)
        const roundedMask = Buffer.from(
            `<svg width="300" height="300">
                <rect x="0" y="0" width="300" height="300" rx="200" ry="200" />
            </svg>`
        );

        // apply the mask to the PFP
        const roundedPfp = await sharp(resizedPfp)
            .composite([{ input: roundedMask, blend: "dest-in" }])
            .png()
            .toBuffer();

        // format over the template
        const composite = await template
            .composite([
                { input: roundedPfp, top: 345, left: 354 } // shifted up 10, right 10
            ])
            .png()
            .toBuffer();

        // create unique ID for this image
        const imageId = uuidv4();

        // encode as base64 string for immediate display
        const base64Img = composite.toString("base64");

        // Return success response with both the generated image and shareable URL
        return NextResponse.json({
            success: true,
            image: base64Img,
            imageId: imageId,
            shareableUrl: `${req.nextUrl.origin}/api/image/${imageId}`,
            profileImage: profilePic,
            username: username,
            mutual: mutual
        });
    } catch (err) {
        console.error("Error generating image:", err);
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}