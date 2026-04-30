"use client";

import { Home, FileText, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F7F7F9] border-t border-[#EAEAEA] pb-[env(safe-area-inset-bottom)] z-50">
      <div className="max-w-3xl mx-auto flex justify-between items-center px-8 py-3">
        <Link href="/" className="flex flex-col items-center gap-1 group">
          <Home className={`w-6 h-6 ${pathname === '/' ? 'text-[#F97316] fill-[#F97316]' : 'text-[#A0A0B0]'}`} />
          <span className={`${pathname === '/' ? 'text-[#F97316] font-bold' : 'text-[#A0A0B0] font-medium group-hover:text-[#1C1A2E]'} text-[11px] transition-colors`}>Home</span>
        </Link>
        
        <Link href="/orders" className="flex flex-col items-center gap-1 group">
          <FileText className={`w-6 h-6 ${pathname === '/orders' ? 'text-[#F97316] fill-[#F97316]' : 'text-[#A0A0B0]'}`} />
          <span className={`${pathname === '/orders' ? 'text-[#F97316] font-bold' : 'text-[#A0A0B0] font-medium group-hover:text-[#1C1A2E]'} text-[11px] transition-colors`}>Orders</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center gap-1 group">
          <User className={`w-6 h-6 ${pathname === '/profile' ? 'text-[#F97316] fill-[#F97316]' : 'text-[#A0A0B0]'}`} />
          <span className={`${pathname === '/profile' ? 'text-[#F97316] font-bold' : 'text-[#A0A0B0] font-medium group-hover:text-[#1C1A2E]'} text-[11px] transition-colors`}>Profile</span>
        </Link>
      </div>
    </div>
  );
}
