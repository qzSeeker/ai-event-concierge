/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import SearchBox from '@/components/SearchBox'
import ProposalCard from '@/components/ProposalCard'
import HistoryList from '@/components/HistoryList'
import { motion } from 'framer-motion'
import { getSessionId } from '@/lib/session'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [proposal, setProposal] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const sessionIdRef = useRef<string>('')  
  
  const fetchHistory = async (id: string) => {
    if (!id) return
    const res = await fetch(`/api/history?sessionId=${id}`)
    const json = await res.json()
    if (json.success) setHistory(json.data)
    }
  
  useEffect(() => {
    const id = getSessionId()
    sessionIdRef.current = id
    fetchHistory(id)
  }, [])

  const handleResult = (data: any) => {
    setProposal(data)
    setHistory((prev) => [data, ...prev.filter((h) => h.id !== data.id)])
  }

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline gap-3 mb-8"
        >
          <h1 className="text-2xl font-semibold text-white">Event Concierge</h1>
          <span className="text-xs text-white/40 border border-white/15 rounded-full px-3 py-1">
            AI-powered
          </span>
        </motion.div>

        <SearchBox
          onResult={handleResult}
          onLoading={setLoading}
          loading={loading}
          sessionIdRef={sessionIdRef}
        />

        <ProposalCard proposal={proposal} />

        <HistoryList history={history} />

      </div>
    </main>
  )
}