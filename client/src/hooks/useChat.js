import { useState, useCallback } from "react";
import { api, API_BASE_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${API_BASE_URL}/messages/chat`;

export const useChat = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadMessages = useCallback(async (convId) => {
    try {
      const data = await api.messages.list(convId);
      if (data.error) throw new Error(data.error);

      const typedMessages = (data || []).map((m) => ({
        id: m._id,
        role: m.role,
        content: m.content,
        created_at: m.created_at,
      }));
      setMessages(typedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast({ title: "Error", description: "Failed to load messages", variant: "destructive" });
    }
  }, [toast]);

  const sendMessage = useCallback(async (content, convId) => {
    if (!content.trim() || isLoading) return;
    setIsLoading(true);

    const userMessage = { id: crypto.randomUUID(), role: "user", content, created_at: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);

    try {
      await api.messages.send(convId, "user", content);

      const aiMessages = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      const token = localStorage.getItem("token");
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ messages: aiMessages }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to get AI response");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let textBuffer = "";
      const assistantId = crypto.randomUUID();
      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "", created_at: new Date().toISOString() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ") || line.trim() === "" || line.startsWith(":")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            break;
          }
          try {
            const delta = JSON.parse(jsonStr).choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m));
            }
          } catch { break; }
        }
      }

      if (assistantContent) {
        await api.messages.send(convId, "assistant", assistantContent);
      }
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to send message", variant: "destructive" });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, toast]);

  return { messages, setMessages, isLoading, sendMessage, loadMessages };
};
