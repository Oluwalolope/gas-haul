"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Zap, ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SignUpFlow() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Step 1 state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step1Errors, setStep1Errors] = useState<{fullName?: string; phone?: string; password?: string; confirmPassword?: string}>({});
  
  // Step 2 state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(27);
  
  // Refs for OTP inputs
  const otpRef1 = useRef<HTMLInputElement>(null);
  const otpRef2 = useRef<HTMLInputElement>(null);
  const otpRef3 = useRef<HTMLInputElement>(null);
  const otpRef4 = useRef<HTMLInputElement>(null);
  const otpRefs = [otpRef1, otpRef2, otpRef3, otpRef4];
  
  // Step 3 state
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [step3Errors, setStep3Errors] = useState<{street?: string; area?: string; city?: string}>({});

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleRegistration = async () => {
    const phoneDigits = phone.replace(/\D/g, "");

    try {
      setIsSubmitting(true);
      const data = await fetch(`${apiUrl}/auth/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          phone: `+234${phoneDigits}`,
          password
        })
      });

      if (data.ok) {
        const response = await data.json();
        console.log("Registration response:", response);
        alert(`Registration successful! The OTP is ${response.data.debugOtp}.`);

        setStep(2);
        // Reset countdown on new OTP request
        setCountdown(27);
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  }

  const handleOtpVerification = async () => {
    const phoneDigits = phone.replace(/\D/g, "");
    
    try {
      setIsSubmitting(true);
      const data = await fetch(`${apiUrl}/auth/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: `+234${phoneDigits}`,
          code: otp.join("")
        })
      });

      if (data.ok) {
        const response = await data.json();
        console.log("OTP verification response:", response);
        Cookies.set("access_token", response.data.token, { secure: true, sameSite: "strict" });
    
        localStorage.setItem("access_token", response.data.token);
        
        setStep(3);
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setOtpError("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSaveLocation = async () => {
    const accessToken = Cookies.get("access_token") || localStorage.getItem("access_token");

    try {
      setIsSubmitting(true);
      await fetch(`${apiUrl}/users/me/address/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          streetAddress: street,
          area: area,
          city: city,
          landmark: landmark
        })
      });
      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step, countdown]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (!input) {
      setPhone("");
      return;
    }

    let digits = input.replace(/\D/g, "");

    if (digits.startsWith("234")) {
      digits = digits.substring(3);
    }

    if (digits.startsWith("0")) {
      digits = digits.substring(1);
    }

    digits = digits.substring(0, 10);

    let formatted = "";
    if (digits.length > 0) {
      if (digits.length <= 3) {
        formatted = `${digits}`;
      } else if (digits.length <= 6) {
        formatted = `${digits.substring(0, 3)} ${digits.substring(3)}`;
      } else {
        formatted = `${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
      }
    }

    setPhone(formatted);
  };

  const validatePassword = (pass: string) => {
    if (pass.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pass)) return "Password must contain an uppercase letter";
    if (!/[0-9]/.test(pass)) return "Password must contain a number";
    return "";
  };

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!phone.trim() || phone.length < 10) errors.phone = "Valid phone number is required";
    
    const passError = validatePassword(password);
    if (passError) {
      errors.password = passError;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
    } else {
      setStep1Errors({});

      handleRegistration();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    // Take only the last character in case of paste or rapid typing
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleStep2Submit = (e: FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 4) {
      setOtpError("Please enter the full 4-digit code");
    } else {
      setOtpError("");
      handleOtpVerification();
      setStep(3);
    }
  };

  const handleStep3Submit = (e: FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!street.trim()) errors.street = "Street address is required";
    if (!area.trim()) errors.area = "Area is required";
    if (!city.trim()) errors.city = "City is required";

    if (Object.keys(errors).length > 0) {
      setStep3Errors(errors);
    } else {
      setStep3Errors({});
      handleSaveLocation();
      // Success! Move to dashboard or home
      document.cookie = "gashaul_auth=true; path=/; max-age=86400";
      alert("Registration complete!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="bg-[#F8F7F4] w-full max-w-105 rounded-4xl shadow-sm overflow-hidden min-h-175 flex flex-col relative px-8 pt-10 pb-8 border border-gray-100">
        
        {/* STEP 1: ACCOUNT DETAILS */}
        {step === 1 && (
          <form className="flex flex-col h-full grow" onSubmit={handleStep1Submit}>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-[#ea580c] rounded-xl flex items-center justify-center text-white shadow-sm">
                <Zap size={22} fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-[#0f172a]">Gashaul</span>
            </div>

            <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Create your account</h1>
            <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
              Refill your cooking gas from trusted vendors near you.
            </p>

            <div className="space-y-5 grow">
              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Full name</label>
                <input 
                  type="text" 
                  placeholder="Chinedu Okafor"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {step1Errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{step1Errors.fullName}</p>}
              </div>

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
                    onChange={(e) => handlePhoneChange(e)}
                  />
                </div>
                {step1Errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{step1Errors.phone}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="At least 6 characters"
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
                {step1Errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{step1Errors.password}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm your password"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 pr-12 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {step1Errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{step1Errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ea580c] text-white font-bold rounded-2xl py-4 hover:bg-[#c2410c] active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="ml-2">Creating Account...</span>
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            
            <div className="mt-8 text-center pb-2">
              <p className="text-gray-500 text-sm">
                Already have an account? <Link href="/login" className="text-[#ea580c] font-bold hover:underline">Sign in</Link>
              </p>
            </div>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <form className="flex flex-col h-full grow" onSubmit={handleStep2Submit}>
            <div className="relative flex items-center justify-center mb-6 border-b border-gray-200 pb-5 -mx-8 px-8">
              <button 
                type="button"
                onClick={() => setStep(1)} 
                className="absolute left-6 p-2 text-[#0f172a] hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
              <h1 className="text-xl font-bold text-[#0f172a]">Verify your phone</h1>
            </div>

            <div className="text-center mb-10 mt-2">
              <p className="text-gray-500 text-[15px]">
                We sent a 4-digit code to <span className="font-bold text-[#0f172a]">+234 {phone}</span>
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="size-18 text-center text-3xl font-bold rounded-2xl border border-gray-200 bg-white outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all text-[#0f172a]"
                />
              ))}
            </div>
            
            {otpError && <p className="text-red-500 text-sm text-center font-medium mb-4">{otpError}</p>}

            <div className="text-center mb-auto">
              <p className="text-gray-500 text-sm font-medium">
                Resend code in <span className="text-[#0f172a] font-bold">{countdown}s</span>
              </p>
            </div>

            <div className="mt-12">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ea580c] text-white font-bold rounded-2xl py-4 hover:bg-[#c2410c] active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="ml-2">Verifying Phone Number...</span>
                  </span>
                ) : (
                  "Verify Phone Number"
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: DELIVERY ADDRESS */}
        {step === 3 && (
          <form className="flex flex-col h-full grow" onSubmit={handleStep3Submit}>
            <div className="border-b border-gray-200 pb-5 -mx-8 px-8 mb-6">
              <h1 className="text-[28px] font-extrabold text-[#0f172a] mb-1 tracking-tight">Delivery address</h1>
              <p className="text-gray-500 text-[15px]">We&apos;ll save this to your profile.</p>
            </div>

            <div className="space-y-5 grow">
              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Street address</label>
                <input 
                  type="text" 
                  placeholder="14 Adeola Odeku Street"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                {step3Errors.street && <p className="text-red-500 text-xs mt-1.5 font-medium">{step3Errors.street}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Area / Neighbourhood</label>
                <input 
                  type="text" 
                  placeholder="Victoria Island"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                {step3Errors.area && <p className="text-red-500 text-xs mt-1.5 font-medium">{step3Errors.area}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">City</label>
                <input 
                  type="text" 
                  placeholder="Lagos"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {step3Errors.city && <p className="text-red-500 text-xs mt-1.5 font-medium">{step3Errors.city}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0f172a] mb-2">Landmark</label>
                <input 
                  type="text" 
                  placeholder="Opposite Eko Hotel"
                  className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-colors placeholder:text-gray-400 text-[#0f172a]"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ea580c] text-white font-bold rounded-2xl py-4 hover:bg-[#c2410c] active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin" size={20} />
                    <span className="ml-2">Saving address...</span>
                  </span>
                ) : (
                  "Save address and continue"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
