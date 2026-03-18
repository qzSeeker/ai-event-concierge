/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
    onResult: (data: any) => void
    onLoading: (loading: boolean) => void
    loading: boolean
}

export default function SearchBox({ onResult, onLoading, loading }: Props) {
    const [query, setQuery] = useState('')

    const handleSubmit = async () => {
        if (!query.trim() || loading) return

        onLoading(true)
        try {
        const res = await fetch('/api/concierge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        })
        const json = await res.json()
        if (json.success) {
            onResult(json.data)
            setQuery('')
        }
        } catch (err) {
        console.error(err)
        } finally {
        onLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
        }
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6"
        >
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase mb-3">
            Describe your event
        </p>

        <div className="flex gap-3 items-end">
            <textarea
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. A 10-person leadership retreat in the mountains for 3 days with a $4k budget"
            className="flex-1 bg-transparent resize-none text-sm text-white/80 placeholder:text-white/25 outline-none leading-relaxed"
            />

            <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            className="shrink-0 bg-white text-[#1a1a1a] text-sm font-medium px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
            {loading ? 'Planning...' : 'Plan it →'}
            </motion.button>
        </div>

        {loading && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3"
            >
            <div className="h-0.5 w-full bg-white/10 rounded overflow-hidden">
                <motion.div
                className="h-full bg-white/40 rounded"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '40%' }}
                />
            </div>
            <p className="text-xs text-white/35 mt-2">AI is planning your offsite...</p>
            </motion.div>
        )}
        </motion.div>
    )
}