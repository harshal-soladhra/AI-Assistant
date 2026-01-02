import { useState, useMemo, useEffect } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const useConversations = (userId) => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadConversations = useMemo(() => async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const data = await api.conversations.list();
      if (data.error) throw new Error(data.error);
      
      const mappedData = (data || []).map((c) => ({
        ...c,
        id: c._id
      }));
      setConversations(mappedData);
    } catch (error) {
      console.error("Error loading conversations:", error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }, [userId, toast]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const createConversation = async () => {
    if (!userId) return null;

    try {
      const data = await api.conversations.create("New Conversation");
      if (data.error) throw new Error(data.error);
      
      const newConversation = { ...data, id: data._id };
      setConversations(prev => [newConversation, ...prev]);
      return newConversation;
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteConversation = async (conversationId) => {
    try {
      const data = await api.conversations.delete(conversationId);
      if (data.error) throw new Error(data.error);
      
      setConversations(prev => prev.filter(c => c.id !== conversationId && c._id !== conversationId));
      return true;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    refreshConversations: loadConversations,
  };
};
