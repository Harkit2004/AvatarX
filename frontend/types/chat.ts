export interface Message {
  type: "user" | "assistant"
  content: string
  image?: string
  modelUrl?: string
  timestamp: Date
}
