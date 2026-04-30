import { MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#1C1A2E] px-5 pt-12 pb-8 md:px-12 md:py-16 w-full shadow-sm">
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-[#A0A0B0] text-[15px] font-medium mb-1.5 flex items-center gap-1">
          Hello, User <span>👋</span>
        </p>

        <h1 className="text-white text-[28px] md:text-5xl font-bold leading-[1.2] mb-6 tracking-tight">
          Find a trusted gas<br /> vendor
        </h1>

        <div className="flex items-center gap-2 mt-2">
          <MapPin className="text-[#F97316] w-[18px] h-[18px] fill-[#F97316]" strokeWidth={1.5} />
          <p className="text-[#A0A0B0] text-[13px] md:text-sm">
            Delivering to{' '}
            <span className="text-white font-medium">
              house address...
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
