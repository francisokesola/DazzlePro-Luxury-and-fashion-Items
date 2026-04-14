const MARQUEE_ITEMS = [
  'Gift Wrapping', 'Certificate of Authenticity', 'Custom Styling',
  'Lifetime Warranty', '30-Day Returns', 'Ethically Sourced Materials',
  'Gift Wrapping', 'Certificate of Authenticity', 'Custom Styling',
  'Lifetime Warranty', '30-Day Returns', 'Ethically Sourced Materials',
];

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <div key={i} className="marquee-item">
            <span>✦</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}
