"use client"

import type { Message } from "@/types/chat"
import { DynamicModelViewer } from "./dynamic-model-viewer"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bot } from "lucide-react"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-2 max-w-2xl`}>
        <Avatar className="w-8 h-8">
          <AvatarFallback>{isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}</AvatarFallback>
        </Avatar>

        <div className={`px-4 py-2 rounded-lg ${isUser ? "bg-primary text-primary-foreground ml-2" : "bg-muted mr-2"}`}>
          {message.content && <p className="text-sm">{message.content}</p>}

          {message.image && (
            <div className="mt-2">
              <img src={message.image || "/placeholder.svg"} alt="Uploaded" className="max-w-xs rounded border" />
            </div>
          )}

          {message.modelUrl && (
            <div className="mt-2">
              <DynamicModelViewer modelUrl={message.modelUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
