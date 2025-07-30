"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { fetchCountries } from "@/lib/countries";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

const schema = z.object({
  countryCode: z.string().nonempty(),
  phone: z.string().min(7, "Invalid Phone number"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [simOtp, setSimOtp] = useState("");
  const { setPhone, login } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const sendOtp = (data: FormData) => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setSimOtp(generatedOtp);
    setOtpSent(true);
    toast.success(`Otp sent: ${generatedOtp}`);
    setPhone(`${data.countryCode}${data.phone}`);
  };

  const verifyOtp = () => {
    if (otp === simOtp) {
      login();
      toast.success("OTP Verified");
      router.push("/dashboard");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login via OTP</h2>
        {!otpSent ? (
          <form onSubmit={handleSubmit(sendOtp)} className="space-y-4">
            <select
              {...register("countryCode")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}({c.code})
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <p className="text-red-500 text-sm">
                {errors.countryCode.message}
              </p>
            )}
            <input
              {...register("phone")}
              placeholder="Enter phone number"
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
