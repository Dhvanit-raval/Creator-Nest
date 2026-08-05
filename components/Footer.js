import React from 'react'
import Link from 'next/link'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-zinc-900 pt-24 pb-12 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-bold text-2xl tracking-tighter text-white mb-4">CreatorNest</h3>
                        <p className="text-gray-400 text-sm max-w-xs">Empowering creators worldwide with a radically simple platform to get funded.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/" className="text-gray-500 hover:text-white transition-colors cursor-pointer">Home</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer">Privacy</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer">Terms</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white text-sm font-medium">
                        © {currentYear} CreatorNest
                    </p>
                    <p className="text-gray-600 text-xs">All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
