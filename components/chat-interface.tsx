"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Lock } from "lucide-react" // Using Lucide React for icons

export default function ChatInterface() {
  const [messages, setMessages] = useState<
    { id: number; text?: string; audioSrc?: string; sender: "user" | "other" }[]
  >([])
  const [inputMessage, setInputMessage] = useState("")
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showFollowUpMessages, setShowFollowUpMessages] = useState(false)
  const [isPremiumUser, setIsPremiumUser] = useState(false) // Simulate premium status
  const audioRef = useRef<HTMLAudioElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate initial message and delayed audio
    const initialMessageDelay = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 1,
          text: "Olá! Que bom que você chegou. Tenho algo especial para você...",
          sender: "other",
        },
      ])
    }, 1000) // Initial text message after 1 second

    const audioDelay = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 2,
          audioSrc: "https://www.segredinhovip.com/assets/audios/audio1.mp4", // Absolute URL
          sender: "other",
        },
      ])
      setIsAudioPlaying(true)
    }, 10000) // 10 seconds delay for audio

    return () => {
      clearTimeout(initialMessageDelay)
      clearTimeout(audioDelay)
    }
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleAudioEnded = () => {
    setIsAudioPlaying(false)
    setShowFollowUpMessages(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: 3, text: "Quero ouvir sua voz também…", sender: "other" }])
    }, 1000)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: 4, text: "Você tá me ouvindo? Me responde…", sender: "other" }])
    }, 2000)
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, { id: Date.now(), text: inputMessage, sender: "user" }])
      setInputMessage("")
    }
  }

  const handleMicClick = () => {
    if (!isPremiumUser) {
      alert("Este recurso está disponível apenas para assinantes do plano pago.")
    } else {
      // Logic for recording audio (placeholder)
      alert("Iniciando gravação de áudio...")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <header className="bg-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://www.segredinhovip.com/wp-content/uploads/2025/04/logochat.png" // Absolute URL
            alt="Logo Chat"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold text-text-purple">Chat VIP</h1>
        </div>
        {/* Simulate premium toggle for demonstration */}
        <Button onClick={() => setIsPremiumUser(!isPremiumUser)} variant="outline" className="text-sm">
          {isPremiumUser ? "Desativar Premium" : "Ativar Premium"}
        </Button>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] p-3 rounded-lg shadow-sm animate-fadeIn ${
                msg.sender === "user" ? "bg-chat-bubble-user text-text-dark" : "bg-chat-bubble-other text-text-dark"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.audioSrc && (
                <audio
                  ref={audioRef}
                  src={msg.audioSrc}
                  controls
                  onEnded={handleAudioEnded}
                  autoPlay={isAudioPlaying} // Auto-play when audioSrc is set
                />
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200 flex items-center gap-2">
        <Button
          onClick={handleMicClick}
          disabled={!isPremiumUser}
          className={`p-2 rounded-full ${
            isPremiumUser
              ? "bg-purple-gradient-start hover:bg-purple-gradient-middle"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          aria-label="Gravar áudio"
        >
          {isPremiumUser ? <Mic className="w-5 h-5 text-white" /> : <Lock className="w-5 h-5 text-gray-500" />}
        </Button>
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          className="flex-1 p-2 rounded-full bg-chat-input-bg border-none focus:ring-0"
        />
        <Button
          onClick={handleSendMessage}
          className="p-2 rounded-full bg-purple-gradient-start hover:bg-purple-gradient-middle"
          aria-label="Enviar mensagem"
        >
          <Send className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  )
}
