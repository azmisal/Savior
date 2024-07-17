"use client"
import React,{ useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox"
import Style from "@/app/Styles/Signup.module.css"
export default function Signup() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div className={`${Style.signupPage} w-screen flex items-center justify-center	`}>
    <div className="flex-col w-4/5 bg-dark-bg max-w-sm items-center justify-center	 space-x-2">/
      <Input type="text" placeholder="UserName" className='w-2/3'/>
      <Input type="email" placeholder="Email" />
      <Input type="Password" placeholder="Password" />
      <div className="flex items-center space-x-2">
      <Checkbox id="terms2" className='bg-white border-white' />
      <label
        htmlFor="terms2"
        className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Show password
      </label>
    </div>
      <Button type="submit">Subscribe</Button>
    </div>
    </div>
  )
}
