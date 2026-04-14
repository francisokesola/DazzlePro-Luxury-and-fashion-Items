import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-logo" style={{ fontSize: '1.4rem' }}>DazzlePro</Link>
          <p>Where luxury meets conscience. Fine jewellery and couture fashion, crafted for those who appreciate the extraordinary.</p>
        </div>
        <div className="footer-col">
          <h4>Collections</h4>
          <ul>
            <li><a href="#collections">Fine Jewellery</a></li>
            <li><a href="#collections">Couture</a></li>
            <li><a href="#collections">Accessories</a></li>
            <li><a href="#collections">Watches</a></li>

          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="http://wa.me/2348105744208">Personal Styling</a></li>
            <li><a href="http://wa.me/2348105744208">Gift Wrapping</a></li>
            <li><a href="http://wa.me/2348105744208">Engravings</a></li>
            <li><a href="http://wa.me/2348105744208">Repairs</a></li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <span>© 2026 Dazzle. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service · Cookies</span>
      </div>
    </footer>
  );
}
