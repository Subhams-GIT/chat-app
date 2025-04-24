import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ShieldCheck, Globe } from "lucide-react"
import { motion } from "framer-motion"
import {  useNavigate } from "react-router"
function App() {
  const nav=useNavigate()
  return(
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <div className="max-w-5xl mx-auto text-center mt-24">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to ChatVerse
        </motion.h1>
        <p className="text-lg text-gray-600 mb-6">
          A modern real-time chat app – secure, fast, and beautifully simple.
        </p>
        <Button className="text-lg px-6 py-4 rounded-2xl shadow-lg" onClick={()=>nav('/signup')}>
          Get Started
        </Button>
      </div>

      <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Sparkles className="h-8 w-8 text-indigo-600" />}
          title="Real-Time Messaging"
          description="Lightning-fast communication with WebSocket-powered chat."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-8 w-8 text-green-600" />}
          title="Secure & Private"
          description="End-to-end encrypted messaging to keep your chats safe."
        />
        <FeatureCard
          icon={<Globe className="h-8 w-8 text-blue-600" />}
          title="Cross-Platform"
          description="Works seamlessly across mobile, tablet, and desktop."
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}


export default App;