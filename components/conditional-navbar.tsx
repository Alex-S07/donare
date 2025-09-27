'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navigation/navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar for admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  return <Navbar />;
}
