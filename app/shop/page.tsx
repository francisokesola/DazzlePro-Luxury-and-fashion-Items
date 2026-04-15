'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import Shop from '../components/Shop';
import Footer from '../components/Footer';

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      <Navbar />
      <CartSidebar />
      <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <Shop activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>
      <Footer />
    </>
  );
}
