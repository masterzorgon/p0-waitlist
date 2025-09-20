// import { NextRequest, NextResponse } from "next/server";
// import { saveFormSubmission } from "@/lib/firebase-service";

// export async function POST(request: NextRequest) {
//     try {
//         const formData = await request.json();
        
//         // Validate required fields
//         const { email, telegram, twitter, wallet } = formData;
//         if (!email || !telegram || !twitter || !wallet) {
//             return NextResponse.json({
//                 error: "Missing required fields"
//             }, { status: 400 });
//         }

//         // Save to Firebase
//         const documentId = await saveFormSubmission({
//             email,
//             telegram,
//             twitter,
//             wallet,
//             campaign: 'kamino integration',
//         });

//         console.log('Form submission saved to Firebase:', { documentId, ...formData });

//         return NextResponse.json({
//             success: true,
//             message: "Form submission saved successfully",
//             documentId
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Form submission error:", error);
//         return NextResponse.json({
//             error: error instanceof Error ? error.message : 'Unknown error occurred'
//         }, { status: 500 });
//     }
// }