'use client';

import { useState } from 'react';

import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Hero from './Hero/page';
import Marquee from './components/Marquee';
import Collections from './components/Collections';
import Shop from './components/Shop';
import Banner from './components/Banner';
import Footer from './components/Footer';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      <Navbar />
      <CartSidebar />
      <Hero />
      <Marquee />
      <Collections onCategoryClick={setActiveFilter} />
      <Shop activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <Banner />
      <Footer />
    </>
  );
}
