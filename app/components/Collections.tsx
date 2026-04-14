'use client';

import Image from 'next/image';

const COLLECTIONS = [
  { id: 'jewellery', tag: 'Collection', title: 'Fine Jewellery', image: '/product_jewelry.png' },
  { id: 'clothing', tag: 'Collection', title: 'Couture', image: '/product_clothes.png' },
  { id: 'accessories', tag: 'Collection', title: 'Accessories', image: '/product_handbag.png' },
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
    </section>
  );
}
