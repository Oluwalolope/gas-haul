import { MapPin, ChevronRight, Flag } from 'lucide-react';

export type Vendor = {
  id: string;
  name: string;
  distance: string;
  orders: string | number;
  rating: number | 'New';
  isFlagged?: boolean;
  prices: {
    '3KG': number;
    '5KG': number;
    '12.5KG': number;
  };
};

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  let circleColor = '#10B981';
  let strokeDasharray = '0, 100';
  
  if (typeof vendor.rating === 'number') {
    if (vendor.rating < 60) circleColor = '#F97316'; 
    else if (vendor.rating < 80) circleColor = '#059669';
    else circleColor = '#047857';
    
    strokeDasharray = `${vendor.rating}, 100`;
  }

  return (
    <div className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-[#F0F0F5]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[#1C1A2E] text-[17px] font-bold mb-1.5">{vendor.name}</h3>
          
          {vendor.isFlagged ? (
            <div className="flex items-center gap-1.5 mb-1.5">
              <Flag className="w-[14px] h-[14px] text-[#F97316]" fill="#F97316" />
              <span className="text-[#F97316] text-[13px] font-medium">Flagged</span>
            </div>
          ) : null}
          
          <div className="flex items-center gap-4">
            <div className="flex items-start gap-1">
              <MapPin className="text-[#F97316] w-[14px] h-[14px] mt-0.5" strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="text-[#8E8E9F] text-[13px] font-medium leading-tight">{vendor.distance}</span>
                <span className="text-[#A0A0B0] text-[12px]">away</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[#8E8E9F] text-[13px] font-medium leading-tight">{vendor.orders}</span>
              <span className="text-[#A0A0B0] text-[12px]">
                {vendor.rating === 'New' ? 'vendor' : 'orders'}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Circle */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          {typeof vendor.rating === 'number' ? (
            <>
              <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 36 36">
                <path
                  className="text-[#F0F0F5]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                {/* Progress Circle */}
                <path
                  style={{ color: circleColor }}
                  className="text-current transition-all duration-500 ease-out"
                  strokeDasharray={strokeDasharray}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[#1C1A2E] text-[15px] font-bold z-10">{vendor.rating}%</span>
            </>
          ) : (
            <div className="w-full h-full rounded-full bg-[#EAEAEA] flex items-center justify-center">
              <span className="text-[#1C1A2E] text-[14px] font-bold">{vendor.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Prices Section */}
      <div className="flex items-center gap-2 mb-5">
        {[
          { weight: '3KG', price: vendor.prices['3KG'] },
          { weight: '5KG', price: vendor.prices['5KG'] },
          { weight: '12.5KG', price: vendor.prices['12.5KG'] },
        ].map((item) => (
          <div key={item.weight} className="flex-1 bg-[#F7F7F9] rounded-[16px] py-2.5 px-3 flex flex-col items-center">
            <span className="text-[#A0A0B0] text-[11px] font-medium mb-0.5">{item.weight}</span>
            <span className="text-[#1C1A2E] text-[14px] font-bold">
              ₦{item.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="flex justify-between items-center pt-1 border-t border-transparent">
        <span className="text-[#A0A0B0] text-[13px] font-medium">Tap to order</span>
        <button className="flex items-center gap-0.5 text-[#F97316] font-bold text-[15px] hover:opacity-80 transition-opacity">
          Order now <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
