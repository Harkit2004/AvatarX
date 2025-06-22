"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, ImageIcon } from "lucide-react"
import type { Message } from "@/types/chat"

interface ChatInputProps {
  onSendMessage: (message: Message) => void
  onUpdateMessage: (updates: Partial<Message>) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function ChatInput({ onSendMessage, onUpdateMessage, isGenerating, setIsGenerating }: ChatInputProps) {
  const [input, setInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const humanFileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    onSendMessage(userMessage)
    setInput("")
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-3d-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const modelUrl = URL.createObjectURL(blob)

        const botMessage: Message = {
          type: "assistant",
          content: "Here's your 3D model generated from the prompt!",
          modelUrl,
          timestamp: new Date(),
        }

        onSendMessage(botMessage)
      } else {
        throw new Error("Failed to generate 3D model")
      }
    } catch (error) {
      const errorMessage: Message = {
        type: "assistant",
        content: "Sorry, I encountered an error while generating the 3D model. Please try again.",
        timestamp: new Date(),
      }
      onSendMessage(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = async (file: File, isHuman = false) => {
    if (isGenerating) return

    const userMessage: Message = {
      type: "user",
      content: isHuman ? "Generate a 3D avatar from this photo" : "Convert this image to a 3D model",
      image: URL.createObjectURL(file),
      timestamp: new Date(),
    }

    onSendMessage(userMessage)
    setIsGenerating(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const endpoint = isHuman ? "/api/upload-human-image" : "/api/upload-image"
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const modelUrl = URL.createObjectURL(blob)

        const botMessage: Message = {
          type: "assistant",
          content: isHuman
            ? "Here's your 3D avatar generated from your photo!"
            : "Here's your 3D model generated from the image!",
          modelUrl,
          timestamp: new Date(),
        }

        onSendMessage(botMessage)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to generate 3D model")
      }
    } catch (error) {
      const errorMessage: Message = {
        type: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        timestamp: new Date(),
      }
      onSendMessage(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => humanFileInputRef.current?.click()}
              disabled={isGenerating}
            >
              <User className="w-4 h-4 mr-2" />
              Human Avatar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isGenerating}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Image to 3D
            </Button>
          </div>

          <div className="flex space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to create in 3D..."
              className="flex-1 min-h-[60px] resize-none"
              disabled={isGenerating}
            />
            <Button type="submit" disabled={!input.trim() || isGenerating} className="self-end">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(file, false)
          }}
        />

        <input
          ref={humanFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(file, true)
          }}
        />
      </div>
    </div>
  )
}
