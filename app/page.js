'use client'

import Link from 'next/link'
import { ArrowRight, Users, Heart, Zap, Award, Rocket } from 'lucide-react'

export default function Home() {
    return (
        <main className="bg-zinc-950">
            {/* Hero */}
            <section className="min-h-[85vh] flex items-center bg-zinc-950 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-100 mb-8 leading-[0.9]">
                            Fund Your <br/> Creative Journey.
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl font-medium leading-relaxed">
                            Connect directly with your fans. Get funded for what you love creating. Build a sustainable career on your own terms.
                        </p>
                        <div className="flex flex-wrap gap-6 items-center">
                            <Link href="/login">
                                <button className="px-10 py-5 bg-zinc-100 text-zinc-950 hover:bg-white transition-colors flex items-center gap-3 font-semibold text-lg uppercase tracking-widest cursor-pointer shadow-lg shadow-zinc-100/10">
                                    Start Now
                                    <ArrowRight size={20} />
                                </button>
                            </Link>
                            <button className="px-10 py-5 border-b-2 border-transparent text-zinc-100 hover:border-zinc-100 transition-colors font-semibold text-lg uppercase tracking-widest cursor-pointer">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-32 bg-zinc-950 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-100 mb-20">Why Creators <br/> Choose Us.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                        {[
                            { icon: Users, title: 'Connect with Fans', desc: 'Build meaningful relationships with your true supporters.' },
                            { icon: Heart, title: 'Direct Support', desc: 'Get funded directly by your community without middlemen.' },
                            { icon: Zap, title: 'Instant Setup', desc: 'Start earning in minutes, not days. No complex approval.' },
                            { icon: Award, title: 'Grow Your Brand', desc: 'Build and expand your creator portfolio seamlessly.' },
                            { icon: Rocket, title: 'Scale Quickly', desc: 'Tools designed to take you from hobbyist to full-time.' },
                            { icon: Heart, title: 'Keep Control', desc: 'You own your content, your data, and your audience.' },
                        ].map((feature, idx) => {
                            const Icon = feature.icon
                            return (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="mb-6 inline-block p-4 bg-zinc-900 rounded-full group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-colors duration-300">
                                        <Icon size={32} className="text-zinc-100 group-hover:text-zinc-950 transition-colors duration-300" />
                                    </div>
                                    <h3 className="font-bold text-2xl tracking-tight text-zinc-100 mb-3">{feature.title}</h3>
                                    <p className="text-zinc-400 text-lg leading-relaxed">{feature.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-40 bg-zinc-900 text-zinc-100 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">Ready to get funded?</h2>
                    <p className="text-2xl text-zinc-400 mb-12 font-medium">Join independent creators earning from their passion.</p>
                    <Link href="/login">
                        <button className="px-12 py-6 bg-zinc-100 text-zinc-950 hover:bg-white transition-colors font-bold text-xl uppercase tracking-widest inline-flex items-center gap-3 cursor-pointer shadow-lg shadow-zinc-100/10">
                            Start Free Today
                            <ArrowRight size={24} />
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    )
}