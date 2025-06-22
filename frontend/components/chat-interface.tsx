"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"
import type { Message } from "@/types/chat"

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const updateLastMessage = (updates: Partial<Message>) => {
    setMessages((prev) => prev.map((msg, index) => (index === prev.length - 1 ? { ...msg, ...updates } : msg)))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar messages={messages} />
      <ChatArea
        messages={messages}
        addMessage={addMessage}
        updateLastMessage={updateLastMessage}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />
    </div>
  )
}
