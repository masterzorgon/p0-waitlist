import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    try {
        const { wallet } = await request.json();

        if (!wallet) {
            return NextResponse.json({
                success: false,
                error: "Wallet address is required"
            }, { status: 400 });
        }

        const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!,
            {
                db: {
                    schema: 'application'
                }
            }
        );

        const { data: walletData, error: walletError } = await supabase
            .from('v_marginfi_points_v100')
            .select('authority, total_points, rank')
            .eq('authority', wallet);

        if (walletError) {
            console.error("Supabase query error:", walletError);
            return NextResponse.json({
                success: false,
                error: "Database query failed"
            }, { status: 500 });
        }

        if (!walletData || walletData.length === 0) {
            return NextResponse.json({
                success: false,
                error: "Wallet not found or no points data available"
            }, { status: 404 });
        }

        const walletInfo = walletData[0]; // Get the first (and should be only) result

        const response = {
            wallet: walletInfo.authority,
            points: walletInfo.total_points,
            rank: walletInfo.rank
        };

        return NextResponse.json({
            success: true,
            data: response
        }, { status: 200 });

    } catch (error) {
        console.error("Wallet points query error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
