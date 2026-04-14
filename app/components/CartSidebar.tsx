'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, itemCount } = useCart();

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-sidebar${isOpen ? ' open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h2>Your Cart <span style={{ fontSize: '0.9rem', color: 'var(--gold)', fontFamily: 'var(--font-sans)' }}>({itemCount})</span></h2>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛍</span>
              <p>Your cart is empty</p>
              <button className="btn-gold-outline" onClick={closeCart} style={{ maxWidth: '200px' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <Image src={item.image} alt={item.name} width={70} height={70} className="cart-item-img" />
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₦{(item.price * item.quantity).toLocaleString()}</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label="Remove item">✕</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-price">₦{total.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
              onClick={closeCart}
            >
              Proceed to Checkout →
            </Link>
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
