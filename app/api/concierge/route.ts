import { NextRequest, NextResponse } from 'next/server'
import { groq } from '@/lib/groq'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json()

        if (!query || query.trim() === '') {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 })
        }

        const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        messages: [
            {
            role: 'system',
            content: `You are a corporate event planning AI. Always respond with ONLY a valid JSON object with exactly these keys:
    {
    "venue_name": "specific venue name",
    "location": "City, State or Country",
    "estimated_cost": "cost as string e.g. ~$3,800",
    "why_it_fits": "2-3 sentences explaining why this venue fits the request"
    }
    No markdown, no extra keys, no explanation outside the JSON.`
            },
            {
            role: 'user',
            content: query
            }
        ]
        })

        const text = completion.choices[0].message.content!
        const proposal = JSON.parse(text)

        const { data, error } = await supabase
        .from('searches')
        .insert({
            user_query: query,
            venue_name: proposal.venue_name,
            location: proposal.location,
            estimated_cost: proposal.estimated_cost,
            why_it_fits: proposal.why_it_fits,
        })
        .select()
        .single()

        if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })

    } catch (err) {
        console.error('Concierge API error:', err)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}