'use client';

import Image from 'next/image';
import Link from 'next/link';

const COLLECTIONS = [
  { id: 'jewellery', tag: 'Collection', title: 'Fine Jewellery', image: '/product_jewelry.png' },
  { id: 'clothing', tag: 'Collection', title: 'Clothing Materials', image: '/emerald_mosaic_classic_Daviva.jpeg' },
  { id: 'accessories', tag: 'Collection', title: 'Accessories', image: '/rayban_glasses.JPG' },
  { id: 'watches', tag: 'Collection', title: 'Watches', image: '/camo_gshock.JPG' },
];

interface CollectionsProps {
  onCategoryClick: (category: string) => void;
}

export default function Collections({ onCategoryClick }: CollectionsProps) {
  return (
    <section className="section" id="collections">
      <div className="section-header">
        <div className="section-eyebrow">Curated For You</div>
        <h2>Our <em>Collections</em></h2>
        <p>Explore categories crafted with intention — each collection a world unto itself.</p>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map(col => (
          <div
            key={col.id}
            className="collection-card"
            onClick={() => onCategoryClick(col.id.charAt(0).toUpperCase() + col.id.slice(1))}
          >
            <Image src={col.image} alt={col.title} width={500} height={500} loading='eager' style={{ objectFit: 'cover' }} />
            <div className="collection-overlay">
              <div className="collection-tag">{col.tag}</div>
              <h3>{col.title}</h3>
              <a href="#shop" className="collection-link">Explore ↗</a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', width: '100%' }}>
        <a
          href="http://wa.me/2348105744208"
          style={{
            backgroundColor: '#0a0a0a',
            color: 'white',
            textDecoration: 'none',
            padding: '1rem 2.5rem',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            border: '1px solid var(--gold)',
            transition: 'all 0.3s ease'
          }}
        >
          Click for Custom Styling
        </a>
      </div>
    </section>
  );
}
