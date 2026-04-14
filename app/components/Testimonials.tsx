const TESTIMONIALS = [
  {
    name: 'Isabelle M.', location: 'Paris, France', initials: 'IM',
    text: "The Éclat necklace is absolutely breathtaking. The craftsmanship is beyond anything I've seen at this price point. AURÉLIE has a lifelong customer.",
  },
  {
    name: 'Sophia K.', location: 'New York, USA', initials: 'SK',
    text: "My Lumière gown turned heads at every event. The silk drapes like a dream. Packaging was exquisite too — a true luxury experience from start to finish.",
  },
  {
    name: 'Amara L.', location: 'Dubai, UAE', initials: 'AL',
    text: "I ordered the Nuit bag as a gift for my sister. The quality is extraordinary — the leather, the hardware, everything feels timeless and perfectly crafted.",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-eyebrow">Client Stories</div>
        <h2>Voices of <em>Elegance</em></h2>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
            </div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.initials}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-location">{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
