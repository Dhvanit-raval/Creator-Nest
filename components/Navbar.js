'use client'
import { useSession, signOut } from "next-auth/react"
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { data: session, status } = useSession()

    return (
        <nav className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white hover:text-gray-300 transition-colors cursor-pointer">
                    CreatorNest
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    <li><Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">Home</Link></li>
                </ul>

                <div className="hidden md:flex items-center gap-4 relative">
                    {status === 'authenticated' ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white text-black rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                {session?.user?.name}
                                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-sm shadow-xl z-50 overflow-hidden">
                                    <Link href="/dashboard">
                                        <button className="w-full px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors border-b border-zinc-800 cursor-pointer">
                                            Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDropdownOpen(false)
                                            signOut({ callbackUrl: '/' })
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="px-5 py-2.5 text-sm font-medium bg-transparent text-white hover:text-gray-300 transition-colors cursor-pointer">
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-5 py-2.5 text-sm font-medium border border-white text-white rounded-sm hover:bg-white hover:text-black transition-colors cursor-pointer">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-white hover:text-gray-300 transition-colors cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-6 py-6">
                    <div className="flex flex-col gap-6">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white cursor-pointer">Home</Link>
                        
                        <div className="border-t border-zinc-800 pt-6 flex flex-col gap-4">
                            {status === 'authenticated' ? (
                                <>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center justify-between px-5 py-3 text-sm font-medium bg-white text-black rounded-sm cursor-pointer"
                                    >
                                        {session?.user?.name}
                                        <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="bg-zinc-800 rounded-sm overflow-hidden border border-zinc-700">
                                            <Link href="/dashboard">
                                                <button className="w-full px-5 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-700 border-b border-zinc-700 cursor-pointer">
                                                    Dashboard
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setMenuOpen(false)
                                                    setDropdownOpen(false)
                                                    signOut({ callbackUrl: '/' })
                                                }}
                                                className="w-full px-5 py-3 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-700 cursor-pointer"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <button className="w-full px-5 py-3 text-sm font-medium bg-white text-black rounded-sm cursor-pointer">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/signup">
                                        <button className="w-full px-5 py-3 text-sm font-medium border border-white text-white rounded-sm hover:bg-white hover:text-black transition-colors cursor-pointer">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
