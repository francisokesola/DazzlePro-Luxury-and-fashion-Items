'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { openCart, itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="navbar" style={scrolled ? { height: '68px', background: 'rgba(10,10,10,0.97)' } : {}}>
      <Link href="/" className="nav-logo">DazzlePro</Link>
      <ul className="nav-links">
        <li><a href="#collections">Collections</a></li>
        <li><a href="#jewellery">Jewellery</a></li>
        <li><a href="#clothing">Clothing</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button className="nav-cart-btn" id="open-cart-btn" onClick={openCart} aria-label="Open cart">
        🛍 Cart
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </button>
    </nav>
  );
}
