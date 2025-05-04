"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/lib/axios";
import { useNavigate, useParams } from "react-router";

const Otp = () => {
  const username=useParams()
  const [otp, setotp] = useState<number[]>(Array(5).fill(""));
  console.log(otp);
  const nav=useNavigate()
  const handleSlotChange=(val:number,index:number)=>{
    setotp(prev => {
      const next = [...prev]
      next[index] = val
      return next
    })
  }


  const onSubmit=async ()=>{
    const res=await api.post(`/verify/${username}`,{
      otp,
    })
    if(res.status==200)
    {
      nav('/dashboard')
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-slate-900 to-gray-900 px-4">
      <Card className="w-full max-w-sm shadow-xl rounded-2xl backdrop-blur border border-white/10 bg-white/5 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Enter Verification Code
          </h2>
          <p className="text-sm text-slate-300 mb-6 text-center">
            We have sent a 6-digit code to your email.
          </p>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              
            >
              <InputOTPGroup onChange={(e) => {
                handleSlotChange(Number(e.currentTarget.innerText),Number(e.currentTarget.id));
              }}>
                <InputOTPSlot index={0} aria-valuenow={otp[0]} />
                <InputOTPSlot index={1} aria-valuenow={otp[1]} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} aria-valuenow={otp[2]} />
                <InputOTPSlot index={3} aria-valuenow={otp[3]} />
                <InputOTPSlot index={4} aria-valuenow={otp[4]} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">
            Verify Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;
