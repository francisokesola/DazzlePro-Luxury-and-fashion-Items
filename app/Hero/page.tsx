'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
    const heroBgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => heroBgRef.current?.classList.add('loaded'), 100);
        return () => clearTimeout(timer);
    }, []);


    return (
        <section className="hero">
            <div ref={heroBgRef} className="hero-bg" style={{ backgroundImage: "url('/hero_fashion.png')" }} />
            <div className="hero-overlay" />
            <div className="hero-content">
                <div className="hero-eyebrow"><span>SS 2026 Collection</span></div>
                <h1>Where <em>Elegance</em><br />Meets Eternity</h1>
                <p>Discover our curated collection of fine jewellery and couture fashion. Each piece tells a story of artisanal mastery and timeless beauty.</p>
                <div className="hero-actions">
                    <a href="#shop" className="btn-primary">Shop Now →</a>
                    <a href="#collections" className="btn-secondary">View Collections</a>
                </div>
            </div>
        </section>
    );
}