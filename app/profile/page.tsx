import BottomNav from '../../components/BottomNav';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F9] flex flex-col font-sans relative">
      <div className="flex-1 w-full max-w-3xl mx-auto px-5 py-12 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-[#1C1A2E] mb-2">My Profile</h1>
        <p className="text-[#A0A0B0] max-w-sm">Manage your personal details, saved addresses, and payment methods here.</p>
      </div>
      <BottomNav />
    </main>
  );
}
