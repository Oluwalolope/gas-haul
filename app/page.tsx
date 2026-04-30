import Header from '../components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F9] flex flex-col font-sans">
      <Header />

      <div className="flex-1 w-full max-w-3xl mx-auto px-5 py-6 md:px-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#1C1A2E] text-lg font-bold">Vendors near you</h2>
          <span className="text-[#A0A0B0] text-sm">7 found</span>
        </div>
      </div>
    </main>
  );
}


