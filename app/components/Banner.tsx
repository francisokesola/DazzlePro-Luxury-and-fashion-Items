import Link from 'next/link';

export default function Banner() {
  return (
    <div className="banner" id="about">
      <div className="banner-content">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Our Promise</div>
        <h2>Crafted with <em>Devotion</em>, Worn with Pride</h2>
        <p>
          Every DazzlePro piece is ethically sourced, meticulously crafted by master artisans,
          and arrives with a lifetime warranty. Beauty that endures, conscience that shines.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
          <a href="#shop" className="btn-primary" style={{ justifyContent: 'center' }}>Discover the Collection →</a>
          <Link href="https://linktr.ee/DazzleFashionHub" className="btn-primary" style={{ justifyContent: 'center' }}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
