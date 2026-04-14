'use client';

import Image from 'next/image';
import { useCart, Product } from '../context/CartContext';
import { useState } from 'react';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Éclat Diamond Necklace', category: 'Jewellery', price: 2_450, oldPrice: 3_100, image: '/product_jewelry.png', badge: 'Bestseller', description: '18k gold, conflict-free diamonds' },
  { id: 2, name: 'Lumière Silk Gown',      category: 'Clothing',  price: 1_890, image: '/product_clothes.png', badge: 'New', description: 'Pure mulberry silk, hand-finished' },
  { id: 3, name: 'Soleil Ring',            category: 'Jewellery', price: 980,  image: '/product_ring.png',    description: 'Platinum-set solitaire diamond' },
  { id: 4, name: 'Nuit Quilted Bag',       category: 'Accessories', price: 1_650, oldPrice: 2_000, image: '/product_handbag.png', badge: 'Sale', description: 'Full-grain leather, 24k hardware' },
  { id: 5, name: 'Aurore Pearl Set',       category: 'Jewellery', price: 760,  image: '/product_jewelry.png', description: 'South Sea pearls, gold clasp' },
  { id: 6, name: 'Velours Blazer',         category: 'Clothing',  price: 1_230, image: '/product_clothes.png', badge: 'New', description: 'Italian cashmere wool blend' },
  { id: 7, name: 'Céleste Bangle',         category: 'Jewellery', price: 590,  image: '/product_ring.png',    description: 'Solid 22k gold, hand-hammered' },
  { id: 8, name: 'Riviera Clutch',         category: 'Accessories', price: 890, image: '/product_handbag.png', description: 'Suede with gold chain detail' },
];

const FILTERS = ['All', 'Jewellery', 'Clothing', 'Accessories'];

interface ShopProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function Shop({ activeFilter, onFilterChange }: ShopProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  const handleAdd = (product: Product) => {
    addItem(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section className="section" id="shop">
      <div className="section-header">
        <div className="section-eyebrow">The Edit</div>
        <h2>Featured <em>Pieces</em></h2>
        <p>Handpicked selections from our latest arrivals and enduring favourites.</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map(f => (
          <button
            key={f}
            id={`filter-${f.toLowerCase()}`}
            className={`filter-btn${activeFilter === f ? ' active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map(product => (
          <article key={product.id} className="product-card" id={`product-${product.id}`}>
            <div className="product-img-wrap">
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <button
                className="product-quick-add"
                id={`add-to-cart-${product.id}`}
                onClick={() => handleAdd(product)}
              >
                {added === product.id ? '✓ Added!' : '+ Add to Cart'}
              </button>
            </div>
            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-desc">{product.description}</div>
              <div className="product-price-row">
                <span>
                  <span className="product-price">${product.price.toLocaleString()}</span>
                  {product.oldPrice && <span className="product-price-old">${product.oldPrice.toLocaleString()}</span>}
                </span>
                <button
                  className="btn-gold-outline"
                  style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.65rem' }}
                  onClick={() => handleAdd(product)}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
