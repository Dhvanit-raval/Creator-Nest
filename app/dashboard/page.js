"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
    }, [session, router])

    if (!session) {
        return null
    }


    return (
        <div className="min-h-[85vh] bg-zinc-950">
            {/* Header */}
            <div className="border-b border-zinc-800 py-16 px-6 bg-zinc-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-100">Dashboard</h1>
                        <p className="mt-4 text-xl text-zinc-400 font-medium">Welcome back, {session.user?.name || 'Creator'}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href={`/${session.user?.name?.toLowerCase().replace(/\s+/g, '') || 'creator'}`}>
                            <button className="px-6 py-4 bg-zinc-100 text-zinc-950 font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors cursor-pointer shadow-lg shadow-zinc-100/5">
                                View Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="border border-zinc-800 p-8 bg-zinc-900">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Total Earnings</p>
                        <p className="text-4xl font-bold tracking-tighter text-zinc-100">$1,240.00</p>
                    </div>
                    <div className="border border-zinc-800 p-8 bg-zinc-900">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Total Supporters</p>
                        <p className="text-4xl font-bold tracking-tighter text-zinc-100">42</p>
                    </div>
                    <div className="border border-zinc-800 p-8 bg-zinc-800/50">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Profile Views</p>
                        <p className="text-4xl font-bold tracking-tighter text-zinc-100">8,591</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold tracking-tighter text-zinc-100 mb-8">Recent Activity</h2>
                        <div className="space-y-0">
                            {[
                                { name: "niknhi", amount: 50, msg: "Love the new video series!", date: "2 hours ago" },
                                { name: "rohit", amount: 15, msg: "Keep up the great work.", date: "5 hours ago" },
                                { name: "appu", amount: 100, msg: "Big fan!", date: "1 day ago" },
                                { name: "vani", amount: 25, msg: "Coffee on me ☕", date: "2 days ago" }
                            ].map((tx, idx) => (
                                <div key={idx} className="border-b border-zinc-800 py-6 flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg text-zinc-100">{tx.name}</p>
                                        {tx.msg && <p className="text-zinc-400 mt-1 italic">&quot;{tx.msg}&quot;</p>}
                                        <p className="text-xs text-zinc-500 mt-2 font-medium">{tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-zinc-100">+${tx.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 text-sm font-bold uppercase tracking-widest text-zinc-100 hover:text-zinc-400 transition-colors cursor-pointer">
                            View all transactions &rarr;
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-2xl font-bold tracking-tighter text-zinc-100 mb-8">Quick Actions</h2>
                        <div className="space-y-4">
                            <Link href="/profile" className="block">
                                <button className="w-full text-left px-6 py-4 border-2 border-zinc-700 bg-zinc-900 text-zinc-100 font-bold uppercase tracking-widest text-xs hover:border-zinc-500 transition-colors cursor-pointer">
                                    Edit Profile
                                </button>
                            </Link>
                            <button className="w-full text-left px-6 py-4 border-2 border-zinc-700 bg-zinc-900 text-zinc-100 font-bold uppercase tracking-widest text-xs hover:border-zinc-500 transition-colors cursor-pointer">
                                Payout Settings
                            </button>
                        </div>

                        <div className="mt-12 p-8 bg-zinc-900 border border-zinc-800">
                            <h3 className="font-bold mb-2 text-zinc-100">Share your page</h3>
                            <p className="text-sm text-zinc-400 mb-6">Let your followers know they can support you.</p>
                            <input 
                                readOnly 
                                value={`creatornest.com/${session.user?.name?.toLowerCase().replace(/\s+/g, '') || 'creator'}`}
                                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 text-sm font-medium outline-none mb-4" 
                            />
                            <button className="w-full bg-zinc-100 text-zinc-950 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors cursor-pointer">
                                Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
