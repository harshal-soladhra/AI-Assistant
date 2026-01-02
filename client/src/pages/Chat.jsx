import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../store/auth.jsx";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ConversationSidebar } from "@/components/ConversationSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, GraduationCap } from "lucide-react";

const Chat = () => {
  const { user, isLoading: authLoading, LogoutUser: signOut } = useAuth();
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { 
    conversations, 
    isLoading: conversationsLoading, 
    createConversation, 
    deleteConversation,
    refreshConversations 
  } = useConversations(user?._id);
  const { messages, setMessages, isLoading: chatLoading, sendMessage, loadMessages } = useChat(currentConversationId);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
    } else {
      setMessages([]);
    }
  }, [currentConversationId, loadMessages, setMessages]);

  const handleNewConversation = async () => {
    const conversation = await createConversation();
    if (conversation) {
      setCurrentConversationId(conversation.id);
    }
  };

  const handleSelectConversation = (id) => {
    setCurrentConversationId(id);
  };

  const handleDeleteConversation = async (id) => {
    const success = await deleteConversation(id);
    if (success && currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  const handleSendMessage = async (content) => {
    let convId = currentConversationId;
    
    if (!convId) {
      const conversation = await createConversation();
      if (!conversation) return;
      convId = conversation.id;
      setCurrentConversationId(convId);
    }

    await sendMessage(content, convId);
    refreshConversations();
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentConversationId(null);
    setMessages([]);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <ConversationSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onSignOut={handleSignOut}
        isLoading={conversationsLoading}
        userEmail={user.email}
      />

      <div className="flex flex-1 flex-col">
        {!currentConversationId && messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-tutor text-tutor-foreground">
              <GraduationCap className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-semibold">Ready for a Study Session?</h1>
            <p className="text-center text-muted-foreground max-w-md">
              I'm your specialized AI Tutor. Ask me about any subject, from complex math to historical events, and I'll help you master it step-by-step.
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {chatLoading && messages[messages.length - 1]?.role === "assistant" && 
               messages[messages.length - 1]?.content === "" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        )}

        <ChatInput
          onSend={handleSendMessage}
          isLoading={chatLoading}
        />
      </div>
    </div>
  );
};

export default Chat;
