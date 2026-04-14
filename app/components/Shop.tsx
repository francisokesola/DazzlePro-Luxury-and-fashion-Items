'use client';

import Image from 'next/image';
import { useCart, Product } from '../context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Black Gshock', category: 'Watches', price: 2_450, oldPrice: 3_100, image: '/Black_gshock.JPG', badge: 'Bestseller', description: '18k gold, conflict-free diamonds' },
  { id: 2, name: 'Black Steel Hublot  ', category: 'Watches', price: 1_890, image: '/black_hublot.JPG', badge: 'New', description: 'Pure mulberry silk, hand-finished' },
  { id: 3, name: 'Camo Gshock ', category: 'Watches', price: 980, image: '/camo_gshock.JPG', description: 'Platinum-set solitaire diamond' },
  { id: 4, name: 'Nuit Quilted Bag', category: 'Accessories', price: 1_650, oldPrice: 2_000, image: '/product_handbag.png', badge: 'Sale', description: 'Full-grain leather, 24k hardware' },
  { id: 5, name: 'Chunky Gold Bracelets', category: 'Jewellery', price: 760, image: '/chunky_gold_bracelets.JPG', description: 'South Sea pearls, gold clasp' },
  { id: 6, name: 'Velours Blazer', category: 'Clothing', price: 1_230, image: '/product_clothes.png', badge: 'New', description: 'Italian cashmere wool blend' },
  { id: 7, name: 'Rayban Glasses', category: 'Accessories', price: 590, image: '/rayban_glasses.JPG', description: 'Solid 22k gold, hand-hammered' },
  { id: 8, name: 'Emerald Gold set', category: 'Jewellery', price: 890, image: '/emerald_gold_set.JPG', description: 'Suede with gold chain detail' },
  { id: 9, name: 'Cartier Watch', category: 'Watches', price: 890, image: '/cartier_watch.JPG', description: 'Suede with gold chain detail' },
  { id: 10, name: 'Gold Bracelets', category: 'Jewellery', price: 890, image: '/gold_bracelets.JPG', description: 'Suede with gold chain detail' },
  { id: 11, name: 'Heart-shaped jewelly Set', category: 'Jewellery', price: 890, image: '/heart-set.JPG', description: 'Suede with gold chain detail' },
  { id: 12, name: 'Steel Cross Necklace', category: 'Jewellery', price: 890, image: '/steel_cross_necklace.JPG', description: 'Suede with gold chain detail' },

];

const FILTERS = ['All', 'Jewellery', 'Clothing', 'Accessories', 'Watches'];

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
              <Image src={product.image} alt={product.name} width={500} height={500} loading='eager' style={{ objectFit: 'cover' }} />
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
                  <span className="product-price">₦{product.price.toLocaleString()}</span>
                  {product.oldPrice && <span className="product-price-old">₦{product.oldPrice.toLocaleString()}</span>}
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
