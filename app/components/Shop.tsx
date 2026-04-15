'use client';

import Image from 'next/image';
import { useCart, Product } from '../context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Black Gshock', category: 'Watches', price: 17_000, oldPrice: 20_000, image: '/Black_gshock.JPG', badge: 'Bestseller', description: ' A black rubber waterproof G-Shock' },
  { id: 2, name: 'Black Steel Hublot', category: 'Watches', price: 25_000, image: '/black_hublot.JPG', badge: 'New', description: 'A black steel hublot watch and handchain' },
  { id: 3, name: 'Camo Gshock ', category: 'Watches', price: 17000, image: '/camo_gshock.JPG', badge: 'New', description: 'A camoflage print waterproof G-shock' },
  { id: 4, name: 'Chunky Gold Bracelets', category: 'Jewellery', price: 5_000, image: '/chunky_gold_bracelets.JPG', description: 'Three pieces of chunky Gold bracelets' },
  { id: 5, name: 'Rayban Glasses', category: 'Accessories', price: 9_000, image: '/rayban_glasses.JPG', description: ' A fashionable dark Ryayban Glasses' },
  { id: 6, name: 'Emerald Gold set', category: 'Jewellery', price: 15_000, image: '/emerald_gold_set.JPG', description: 'A gold set with beautiful pink emerald stones' },
  { id: 7, name: 'Cartier Watch', category: 'Watches', price: 27_000, image: '/cartier_watch.JPG', description: 'Gold and Silver Cartier classic watch ' },
  { id: 8, name: 'Gold Bracelets', category: 'Jewellery', price: 890, image: '/gold_bracelets.JPG', description: 'A beautiful set of gold bracelets' },
  { id: 9, name: 'Heart-shaped jewelly Set', category: 'Jewellery', price: 10_000, image: '/heart-set.JPG', description: ' A heart shape jewelries set' },
  { id: 10, name: 'Steel Cross Necklace', category: 'Jewellery', price: 10_000, image: '/steel_cross_necklace.JPG', description: ' A fashionable steel cross necklace' },
  { id: 11, name: 'MonoChrome Tribal Print Daviva', category: 'Clothing', price: 4_000, image: '/monochrome_tribal_print.jpeg', description: '6 yards of a black and white tribal design daviva material' },
  { id: 12, name: 'Emerald Mosaic Classic Daviva', category: 'Clothing', price: 4_000, image: '/emerald_mosaic_classic_Daviva.jpeg', description: '6 yards of an emerald mosaic classic daviva material' },
  { id: 13, name: 'Pink Zebra Daviva', category: 'Clothing', price: 4_000, image: '/Pink_Zebra_Luxe.jpeg', description: '6 yards of a pink zebra design daviva materia' },
  { id: 14, name: 'Black Classy Gown', category: 'Custom Styling', price: 20_000, image: '/blackclassy_gown .jpeg', description: ' Custom Styled classy black gown for dates' },
  { id: 15, name: ' White Classy Gown', category: 'Custom Styling', price: 45_000, image: '/white_birthday_gown.jpeg', description: ' Custom Styled classy white gown' }



];

const FILTERS = ['All', 'Jewellery', 'Clothing', 'Accessories', 'Watches', 'Custom Styling'];

interface ShopProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  limit?: number;
  showViewAll?: boolean;
}

export default function Shop({ activeFilter, onFilterChange, limit, showViewAll }: ShopProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  const handleAdd = (product: Product) => {
    addItem(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  let filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

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

      {showViewAll && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <Link
            href="/shop"
            className="btn-primary"
            style={{ padding: '1rem 3rem', fontSize: '1rem', letterSpacing: '0.1em' }}
          >
            Explore Entire Shop →
          </Link>
        </div>
      )}
    </section>
  );
}
