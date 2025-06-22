"use client"

import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare } from "lucide-react"
import type { Message } from "@/types/chat"

interface SidebarProps {
  messages: Message[]
}

export function Sidebar({ messages }: SidebarProps) {
  const conversations = messages.reduce(
    (acc, message) => {
      if (message.type === "user") {
        acc.push({
          id: Date.now() + Math.random(),
          title: message.content.slice(0, 30) + (message.content.length > 30 ? "..." : ""),
          timestamp: new Date(),
        })
      }
      return acc
    },
    [] as Array<{ id: number; title: string; timestamp: Date }>,
  )

  return (
    <div className="w-64 bg-muted/50 border-r flex flex-col">
      <div className="p-4 border-b">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Button key={conv.id} variant="ghost" className="w-full justify-start text-left h-auto p-3">
              <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{conv.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <UserButton />
          <span className="text-sm text-muted-foreground">Account</span>
        </div>
      </div>
    </div>
  )
}
