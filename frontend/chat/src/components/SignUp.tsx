'use client'
import getUsername from '../../../../Common/SuggestUsername'
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { signupSchema } from '@/Schemas/SignupSchema'
import SignupUser from '@/Functions/Signup'
import { useNavigate } from 'react-router'

export default function AuthPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const nav = useNavigate()

  // Use React.FormEvent and correct field name (password lowercase)
  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = signupSchema.safeParse({
      username,
      email,
      Password,
    })

    if (!result.success) {
      alert("Please ensure all details are correct")
      return
    }

    try {
      const resStatus = await SignupUser({ username, email, Password })
      if (resStatus === 200) {
        nav('/otp')
      }
    } catch (err) {
      console.error(err)
      alert("Signup failed. Please try again.")
    }
  }

  const handleSuggestUsername = () => {
    const suggestion = getUsername()
    setUsername(suggestion)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-slate-900 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl">
          <CardContent className="p-8">
            <h1 className="text-white text-3xl font-semibold text-center mb-6">Welcome Back 👋</h1>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid grid-cols-2 bg-slate-800 text-white rounded-md mb-6 gap-10">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In */}
              <TabsContent value="signin">
                <form className="space-y-5" onSubmit={onHandleSubmit}>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-slate-900 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-slate-900 text-white"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup">
                <form className="space-y-5" onSubmit={onHandleSubmit}>
                  <div>
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-slate-900 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-white">Username</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="your-username"
                        className="bg-slate-900 text-white flex-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSuggestUsername}
                        className="text-white border-slate-600"
                      >
                        Suggest
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-slate-900 text-white"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2">
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
