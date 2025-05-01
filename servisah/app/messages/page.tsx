"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MoreVertical, Phone, VideoCamera } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

// Mock data - replace with API calls
const mockConversations = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Alice Smith",
      image: "/providers/alice.jpg",
      role: "provider",
      status: "online",
    },
    lastMessage: {
      text: "I'll arrive at 10 AM tomorrow",
      timestamp: "2025-05-01T14:30:00",
      isRead: true,
    },
    booking: {
      service: "House Cleaning",
      date: "2025-05-02T10:00:00",
    },
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Bob Johnson",
      image: "/providers/bob.jpg",
      role: "provider",
      status: "offline",
    },
    lastMessage: {
      text: "Thank you for your booking",
      timestamp: "2025-05-01T12:15:00",
      isRead: false,
    },
    booking: {
      service: "Plumbing Repair",
      date: "2025-05-15T14:00:00",
    },
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "u1",
    text: "Hi! I'm confirming our appointment for tomorrow at 10 AM",
    timestamp: "2025-05-01T14:25:00",
  },
  {
    id: "2",
    senderId: "current-user",
    text: "Yes, that works perfectly. Do I need to prepare anything?",
    timestamp: "2025-05-01T14:27:00",
  },
  {
    id: "3",
    senderId: "u1",
    text: "Just ensure I have access to the cleaning supplies we discussed. I'll arrive at 10 AM tomorrow",
    timestamp: "2025-05-01T14:30:00",
  },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // Add message to the conversation
    // In a real app, this would be handled by the backend
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  return (
    <div className="container py-10">
      <div className="rounded-lg border bg-background shadow-sm">
        <div className="grid lg:grid-cols-[280px,1fr]">
          {/* Conversation List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Messages</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2 p-2">
                {mockConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      "hover:bg-muted",
                      selectedConversation?.id === conversation.id && "bg-muted"
                    )}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.user.image} />
                          <AvatarFallback>
                            {conversation.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                            conversation.user.status === "online"
                              ? "bg-green-500"
                              : "bg-muted"
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {conversation.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              conversation.lastMessage.timestamp
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="truncate text-sm text-muted-foreground">
                          {conversation.lastMessage.text}
                        </div>
                        <div className="text-xs text-primary truncate mt-1">
                          {conversation.booking.service} ·{" "}
                          {new Date(conversation.booking.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedConversation.user.image} />
                      <AvatarFallback>
                        {selectedConversation.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {selectedConversation.user.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.booking.service} ·{" "}
                        {new Date(
                          selectedConversation.booking.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <VideoCamera className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => {
                      const isCurrentUser = message.senderId === "current-user"
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3",
                            isCurrentUser && "justify-end"
                          )}
                        >
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={selectedConversation.user.image}
                              />
                              <AvatarFallback>
                                {selectedConversation.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "rounded-lg px-4 py-2 max-w-[70%]",
                              isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <p>{message.text}</p>
                            <p
                              className={cn(
                                "text-xs mt-1",
                                isCurrentUser
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {isCurrentUser && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user?.image} />
                              <AvatarFallback>
                                {user?.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div className="max-w-md">
                  <h3 className="font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )