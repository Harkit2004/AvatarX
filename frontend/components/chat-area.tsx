"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "./message-bubble"
import { ChatInput } from "./chat-input"
import type { Message } from "@/types/chat"

interface ChatAreaProps {
  messages: Message[]
  addMessage: (message: Message) => void
  updateLastMessage: (updates: Partial<Message>) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function ChatArea({ messages, addMessage, updateLastMessage, isGenerating, setIsGenerating }: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">3D Model Generator</h1>
        <p className="text-sm text-muted-foreground">Upload images or describe what you want to create</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Welcome to 3D Model Generator</h2>
              <p className="text-muted-foreground mb-6">
                Start by uploading an image or describing what you'd like to create
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Human Avatar</h3>
                  <p className="text-sm text-muted-foreground">Upload a photo to create a 3D avatar</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Image to 3D</h3>
                  <p className="text-sm text-muted-foreground">Convert any image into a 3D model</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Text to 3D</h3>
                  <p className="text-sm text-muted-foreground">Describe your idea in words</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-muted p-4 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm">Generating 3D model...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput
        onSendMessage={addMessage}
        onUpdateMessage={updateLastMessage}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />
    </div>
  )
}
