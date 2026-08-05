"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Profile() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [twitter, setTwitter] = useState('')
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        } else if (status === 'authenticated') {
            setName(session?.user?.name || '')
        }
    }, [status, router, session])

    const handleSave = (e) => {
        e.preventDefault()
        setLoading(true)
        setSaved(false)
        // Mock save delay
        setTimeout(() => {
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }, 1000)
    }

    if (status === 'loading' || status === 'unauthenticated') {
        return <div className="min-h-screen bg-black" />
    }

    return (
        <div className="min-h-[85vh] bg-zinc-950 py-16 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-100 transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">
                        &larr; Back to Dashboard
                    </Link>
                </div>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tighter text-zinc-100 mb-3">Edit Profile</h1>
                    <p className="text-zinc-400 font-medium">Update your creator details and public information.</p>
                </div>

                <form onSubmit={handleSave} className="space-y-10">
                    <div className="grid gap-8 border-b border-zinc-800 pb-10">
                        {/* Profile Picture */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Profile Picture</label>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden rounded-sm">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Creator')}&size=160&background=ffffff&color=000000&rounded=false`} 
                                        alt="Profile preview" 
                                        className="w-full h-full object-cover p-1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="cursor-pointer bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-100 px-6 py-3 text-sm font-bold tracking-widest uppercase transition-colors inline-block">
                                        Upload New
                                        <input type="file" className="hidden" accept="image/*" />
                                    </label>
                                    <p className="text-xs text-zinc-500 font-medium">JPG, PNG or GIF. Max size 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Display Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Bio / Tagline</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg resize-none"
                                placeholder="What do you create?"
                            />
                        </div>
                    </div>

                    <div className="grid gap-8 border-b border-zinc-800 pb-10">
                        <h2 className="text-xl font-bold text-zinc-100">Social Links</h2>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Twitter / X</label>
                            <input
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                type="text"
                                className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg"
                                placeholder="@username"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-zinc-100 text-zinc-950 px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors cursor-pointer disabled:opacity-50 shadow-lg shadow-zinc-100/10"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        {saved && (
                            <span className="text-sm font-bold text-green-500 uppercase tracking-widest">
                                Saved successfully
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
