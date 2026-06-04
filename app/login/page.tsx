"use client";

import { useState, FormEvent } from "react";
import { Zap, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{phone?: string; password?: string}>({});

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!phone.trim() || phone.length < 10) newErrors.phone = "Valid phone number is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      document.cookie = "gashaul_auth=true; path=/; max-age=86400";
      alert("Logged in successfully!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="bg-[#F8F7F4] w-full max-w-[420px] rounded-[32px] shadow-sm overflow-hidden min-h-[600px] flex flex-col relative px-8 pt-10 pb-8 border border-gray-100">
        
        <form className="flex flex-col h-full flex-grow" onSubmit={handleLogin}>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#ea580c] rounded-xl flex items-center justify-center text-white shadow-sm">
              <Zap size={22} fill="currentColor" />
            </div>
            <span className="font-bold text-xl text-[#0f172a]">Gashaul</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
            Sign in to continue refilling your cooking gas.
          </p>

          <div className="space-y-5 flex-grow">
            <div>
              <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Phone number</label>
              <div className="flex bg-white border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#ea580c] focus-within:ring-1 focus-within:ring-[#ea580c] transition-colors">
                <div className="px-4 py-4 border-r border-gray-200 text-gray-500 flex items-center justify-center bg-white font-medium">
                  +234
                </div>
                <input 
                  type="tel" 
                  placeholder="803 000 0000"
                  className="w-full px-4 py-4 outline-none bg-transparent placeholder:text-gray-400 text-[#0f172a]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 pr-12 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
            </div>
            
            <div className="text-right">
              <a href="#" className="text-sm font-semibold text-[#ea580c] hover:underline">Forgot password?</a>
            </div>
          </div>

          <div className="mt-8">
            <button 
              type="submit"
              className="w-full bg-[#ea580c] text-white font-bold rounded-2xl py-4 hover:bg-[#c2410c] active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-8 text-center pb-2">
            <p className="text-gray-500 text-sm">
              Don't have an account? <Link href="/signup" className="text-[#ea580c] font-bold hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
