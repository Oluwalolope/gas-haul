"use client";

import { useState } from "react";
import {
  ChevronRight,
  MapPin,
  ClipboardList,
  CreditCard,
  Bell,
  HelpCircle,
  X,
  Plus,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "next/navigation";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USER = { name: "Adeleye Lope", phone: "+234 8094558737", initials: "AL" };

const SAVED_ADDRESSES = [
  { id: 1, label: "Home", detail: "14 Adeola Odeku Street, Lekki" },
  { id: 2, label: "Office", detail: "3 Ajah Market Road, Ajah" },
];

const ORDER_HISTORY = [
  { id: "#GH-001", date: "May 8, 2026", item: "12.5kg Cylinder Refill", status: "Delivered", amount: "₦8,500" },
  { id: "#GH-002", date: "Apr 30, 2026", item: "25kg Cylinder Refill", status: "Delivered", amount: "₦15,000" },
  { id: "#GH-003", date: "Apr 21, 2026", item: "12.5kg Cylinder Refill", status: "Cancelled", amount: "₦8,500" },
];

const PAYMENT_METHODS = [
  { id: 1, type: "Mastercard", last4: "4521", expiry: "09/27" },
  { id: 2, type: "Verve", last4: "8834", expiry: "03/26" },
];

// ─── Shared Header ────────────────────────────────────────────────────────────
function SubPageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0f172a] hover:bg-gray-50 transition-colors shrink-0"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      <h2 className="text-xl font-extrabold text-[#0f172a]">{title}</h2>
    </div>
  );
}

// ─── Sub-views ────────────────────────────────────────────────────────────────
function SavedAddressView({ onBack }: { onBack: () => void }) {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  return (
    <div>
      <SubPageHeader title="Saved Addresses" onBack={onBack} />
      <div className="space-y-3 mb-5">
        {addresses.map((addr) => (
          <div key={addr.id} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#ea580c]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0f172a] text-sm">{addr.label}</p>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{addr.detail}</p>
            </div>
            <button
              onClick={() => setAddresses(addresses.filter((a) => a.id !== addr.id))}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl py-4 text-sm font-semibold text-gray-500 hover:border-[#ea580c] hover:text-[#ea580c] transition-colors bg-white">
        <Plus size={18} /> Add new address
      </button>
    </div>
  );
}

function OrderHistoryView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <SubPageHeader title="Order History" onBack={onBack} />
      <div className="space-y-3">
        {ORDER_HISTORY.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-[#0f172a] text-sm pr-4">{order.item}</p>
              <p className="font-bold text-[#0f172a] text-sm shrink-0">{order.amount}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-xs">{order.id} · {order.date}</p>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentMethodsView({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState(PAYMENT_METHODS);
  return (
    <div>
      <SubPageHeader title="Payment Methods" onBack={onBack} />
      <div className="space-y-3 mb-5">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] flex items-center justify-center shrink-0">
              <CreditCard size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#0f172a] text-sm">{card.type} •••• {card.last4}</p>
              <p className="text-gray-400 text-xs mt-0.5">Expires {card.expiry}</p>
            </div>
            <button
              onClick={() => setCards(cards.filter((c) => c.id !== card.id))}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-2xl py-4 text-sm font-semibold text-gray-500 hover:border-[#ea580c] hover:text-[#ea580c] transition-colors bg-white">
        <Plus size={18} /> Add card
      </button>
    </div>
  );
}

function NotificationsView({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState([
    { id: "orders", label: "Order updates", sub: "Status changes for your gas orders", enabled: true },
    { id: "promo", label: "Promotions & offers", sub: "Deals from vendors near you", enabled: true },
    { id: "sms", label: "SMS alerts", sub: "Text messages for critical updates", enabled: false },
  ]);

  const toggle = (id: string) =>
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));

  return (
    <div>
      <SubPageHeader title="Notifications" onBack={onBack} />
      <div className="space-y-3">
        {settings.map((s) => (
          <div key={s.id} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex-1">
              <p className="font-semibold text-[#0f172a] text-sm">{s.label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
            </div>
            <button
              onClick={() => toggle(s.id)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                s.enabled ? "bg-[#ea580c]" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  s.enabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HelpSupportView({ onBack }: { onBack: () => void }) {
  const faqs = [
    { q: "How do I track my order?", a: "Go to Orders tab and tap on any active order to see real-time tracking." },
    { q: "Can I change my delivery address?", a: "Yes, you can update your address from the Saved Addresses section in your profile." },
    { q: "What if the vendor doesn't deliver?", a: "Contact our support chat and we'll resolve it within 24 hours or issue a full refund." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <SubPageHeader title="Help & Support" onBack={onBack} />
      <button className="w-full flex items-center gap-3 bg-[#ea580c] text-white rounded-2xl py-4 px-5 font-semibold mb-6 hover:bg-[#c2410c] transition-colors">
        <HelpCircle size={20} />
        Start live chat
      </button>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">FAQs</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-4 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-[#0f172a] text-sm pr-3">{faq.q}</span>
              <ChevronRight
                size={18}
                className={`text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-90" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
type ActiveView = "address" | "orders" | "payment" | "notifications" | "help" | null;

export default function ProfilePage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<ActiveView>(null);

  const handleSignOut = () => {
    document.cookie = "gashaul_auth=; path=/; max-age=0";
    router.push("/login");
  };

  const menuItems: { id: ActiveView; icon: React.ReactNode; label: string; hint: string }[] = [
    { id: "address",       icon: <MapPin size={20} />,       label: "Saved address",    hint: "Lekki, Ajah" },
    { id: "orders",        icon: <ClipboardList size={20} />, label: "Order history",    hint: "View all"    },
    { id: "payment",       icon: <CreditCard size={20} />,    label: "Payment methods",  hint: "Add card"    },
    { id: "notifications", icon: <Bell size={20} />,          label: "Notifications",    hint: "On"          },
    { id: "help",          icon: <HelpCircle size={20} />,    label: "Help & support",   hint: "Chat"        },
  ];

  // ── Sub-view ──
  if (activeView) {
    return (
      <main className="min-h-screen bg-[#EBEBEB] flex flex-col font-sans pb-24">
        <div className="w-full max-w-md mx-auto px-4 pt-8">
          {activeView === "address"       && <SavedAddressView    onBack={() => setActiveView(null)} />}
          {activeView === "orders"        && <OrderHistoryView     onBack={() => setActiveView(null)} />}
          {activeView === "payment"       && <PaymentMethodsView   onBack={() => setActiveView(null)} />}
          {activeView === "notifications" && <NotificationsView    onBack={() => setActiveView(null)} />}
          {activeView === "help"          && <HelpSupportView      onBack={() => setActiveView(null)} />}
        </div>
        <BottomNav />
      </main>
    );
  }

  // ── Profile menu ──
  return (
    <main className="min-h-screen bg-[#EBEBEB] flex flex-col font-sans pb-24">
      <div className="w-full max-w-md mx-auto px-4 pt-8">

        {/* Page title */}
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-5">Profile</h1>

        {/* User card */}
        <div className="bg-[#0f172a] rounded-3xl p-5 flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-[#ea580c] flex items-center justify-center text-white text-xl font-extrabold shrink-0">
            {USER.initials}
          </div>
          <div>
            <p className="text-white text-lg font-bold leading-tight">{USER.name}</p>
            <p className="text-gray-400 text-sm mt-0.5">{USER.phone}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-[#F8F7F4] rounded-3xl overflow-hidden divide-y divide-gray-100 mb-5 border border-gray-100">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="w-full flex items-center px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group"
            >
              <span className="text-gray-400 mr-3 shrink-0">{item.icon}</span>
              <span className="flex-1 text-left font-semibold text-[#0f172a] text-[15px]">{item.label}</span>
              <span className="text-gray-400 text-sm mr-2">{item.hint}</span>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <div className="bg-[#F8F7F4] rounded-3xl border border-gray-100 overflow-hidden">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-4 text-[#ea580c] font-bold text-[15px] hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
