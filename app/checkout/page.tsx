'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

// ── Config ────────────────────────────────────────────────────────────
// Change this to the WhatsApp number that receives orders (include country code, no + or spaces)
const WHATSAPP_NUMBER = '2348167797350';

// ── Checkout / Invoice Page ───────────────────────────────────────────
export default function CheckoutPage() {
  const { items, total } = useCart();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const grandTotal = total;
  const invoiceNum = `DZP-${Date.now().toString().slice(-8)}`;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const whatsappText = [
    `🛍 *New Order — DazzlePro*`,
    `📋 Invoice: ${invoiceNum}`,
    `📅 Date: ${date}`,
    ``,
    `*Items:*`,
    ...items.map(i => `  • ${i.name} (x${i.quantity}) — ₦${(i.price * i.quantity).toLocaleString()}`),
    ``,
    `*Total: ₦${grandTotal.toLocaleString()}*`,
  ].join('\n');

  const captureCanvas = async () => {
    if (!invoiceRef.current) throw new Error('No ref');
    const html2canvas = (await import('html2canvas')).default;
    return html2canvas(invoiceRef.current, {
      backgroundColor: '#faf7f2',
      scale: 2,
      useCORS: true,
      logging: false,
    });
  };

  const handleSendWhatsApp = async () => {
    if (!invoiceRef.current || items.length === 0) return;
    setSending(true);

    try {
      const canvas = await captureCanvas();

      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(b => b ? resolve(b) : reject(new Error('Blob failed')), 'image/png')
      );
      const file = new File([blob], `DazzlePro-Order-${invoiceNum}.png`, { type: 'image/png' });

      // 1. Mobile Share Sheet (passes image to WhatsApp directly)
      if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `DazzlePro Order ${invoiceNum}`,
          text: whatsappText,
        });
        setSent(true);
        return;
      }

      // 2. Desktop Clipboard (copies image to paste in WhatsApp)
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          const encodedText = encodeURIComponent(whatsappText + '\n\n_(Paste the invoice image with Ctrl+V)_');
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
          setSent(true);
          return;
        } catch { } // fallback to download
      }

      // 3. Download Fallback
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);

      const encodedText = encodeURIComponent(whatsappText + '\n\n_(Attach the downloaded image)_');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
      setSent(true);

    } catch (err: unknown) {
      console.error(err);
      alert('Could not capture invoice. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Minimal Navbar */}
      <nav className="navbar">
        <Link href="/" className="nav-logo">DazzlePro</Link>
        <ul className="nav-links">
          <li><Link href="/">← Back to Shop</Link></li>
        </ul>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          🛍 Order Summary
        </div>
      </nav>

      <div className="checkout-page">
        <div className="checkout-container" style={{ maxWidth: '720px' }}>

          {/* Page Header */}
          <div className="checkout-header">
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Your Order</div>
            <h1>Order Invoice</h1>
            <p>{items.length} item{items.length !== 1 ? 's' : ''} ready to confirm</p>
          </div>

          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍</p>
              <p style={{ marginBottom: '2rem' }}>Your cart is empty</p>
              <Link href="/" className="btn-primary">Return to Shop →</Link>
            </div>
          ) : (
            <>
              {/* ── Invoice Card (this is what gets screenshotted) ── */}
              <div
                ref={invoiceRef}
                id="invoice-capture"
                style={{
                  background: '#faf7f2',
                  color: '#0a0a0a',
                  padding: '2.5rem',
                  border: '1px solid #e8e0d0',
                }}
              >
                {/* Invoice Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid #c9a84c' }}>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 600, letterSpacing: '0.08em', color: '#0a0a0a' }}>
                      DazzlePro
                    </div>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#9a7a2e', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                      Luxury Fashion &amp; Jewellery
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#0a0a0a' }}>Invoice</div>
                    <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '0.2rem' }}>#{invoiceNum}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '0.1rem' }}>{date}</div>
                  </div>
                </div>

                {/* Responsive Items List */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', borderBottom: '2px solid #c9a84c', paddingBottom: '0.6rem', marginBottom: '0.6rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 600 }}>
                    <div style={{ flex: 1 }}>Item</div>
                    <div style={{ width: '90px', textAlign: 'right' }}>Total</div>
                  </div>
                  {items.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '0.8rem', borderBottom: '1px solid #e8e0d0', gap: '1rem', background: idx % 2 === 0 ? '#fff' : '#f5f0e8' }}>
                      <Image src={item.image} alt={item.name} width={45} height={45} style={{ objectFit: 'cover', flexShrink: 0, borderRadius: '4px' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#0a0a0a' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#777', marginTop: '0.2rem' }}>
                          {item.category} • ₦{item.price.toLocaleString()} × {item.quantity}
                        </div>
                      </div>
                      <div style={{ width: '90px', textAlign: 'right', fontWeight: 600, fontSize: '0.85rem', color: '#0a0a0a' }}>
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{ maxWidth: '240px', marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, borderTop: '2px solid #c9a84c', paddingTop: '0.7rem', marginTop: '0.3rem', color: '#0a0a0a' }}>
                    <span>Grand Total</span>
                    <span style={{ color: '#9a7a2e' }}>₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Invoice Footer */}
                <div style={{ marginTop: '2rem', paddingTop: '1.2rem', borderTop: '1px solid #e8e0d0', textAlign: 'center', fontSize: '0.72rem', color: '#999', lineHeight: 1.7 }}>
                  Thank you for shopping with DazzlePro · contact@dazzlepro.com · Lifetime warranty on all jewellery
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <button
                  id="send-whatsapp-btn"
                  onClick={handleSendWhatsApp}
                  disabled={sending}
                  className="btn-primary"
                  style={{ justifyContent: 'center', fontSize: '0.85rem', padding: '1.1rem', opacity: sending ? 0.7 : 1 }}
                >
                  {sending
                    ? '📸 Capturing screenshot...'
                    : sent
                      ? '✅ Image downloaded — attach it in WhatsApp!'
                      : '📲 Save & Send to WhatsApp'}
                </button>

                {sent && (
                  <div style={{
                    padding: '1rem 1.5rem',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid var(--gold)',
                    fontSize: '0.82rem',
                    color: 'var(--gold)',
                    lineHeight: 1.7,
                    textAlign: 'center',
                  }}>
                    📎 The invoice image was saved to your downloads.<br />
                    WhatsApp is now open — tap the <strong>attachment 📎</strong> icon and select the downloaded image.
                  </div>
                )}

                <Link href="/shop" className="btn-secondary" style={{ justifyContent: 'center', textAlign: 'center' }}>
                  ← Continue Shopping
                </Link>
              </div>

              {/* ── How it works note ── */}
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                <strong style={{ color: 'var(--gold)' }}>How it works:</strong><br />
                Clicking the button above saves your order as a PNG image, then opens WhatsApp<br />
                with a pre-filled order summary. Attach the downloaded image in the chat to send it.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
