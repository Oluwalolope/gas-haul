import BottomNav from '../../components/BottomNav';

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F9] flex flex-col font-sans relative">
      <div className="flex-1 w-full max-w-3xl mx-auto px-5 py-12 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-[#1C1A2E] mb-2">No Active Orders</h1>
        <p className="text-[#A0A0B0] max-w-sm">You haven't placed any gas orders yet. Head back to the home page to find a vendor near you.</p>
      </div>
      <BottomNav />
    </main>
  );
}
