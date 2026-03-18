import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("searches")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(20)

        if (error) {
            console.error('Supabase fetch error:', error)
            return NextResponse.json({ error: 'Failed to fetch search history' }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })

    } catch (error) {
        console.error('History API error:', error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}