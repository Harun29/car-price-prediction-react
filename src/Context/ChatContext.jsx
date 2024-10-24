import React, { createContext, useState, useContext, useEffect } from "react";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm CarMate, your AI assistant powered by GPT-4o-mini. I'm here to help you with any questions or tasks you have. Just type in your message, and I'll do my best to assist you. How can I help you today?",
    },
  ]);

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    const updatedMessages = [...messages, { role: "user", content: message }];

    setMessages(updatedMessages);

    try {
      const response = await fetch("https://ml-flask-server-production.up.railway.app/get_ai_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI message");
      }

      const data = await response.json();
      const aiMessage = data.ai_message;

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: aiMessage },
      ]);

      return "ok"
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (event, message) => {
    event.preventDefault();
    try {
      const response = await handleSendMessage(message);
      if(response === "ok"){
        return "ok";
      }
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const values = {
    messages,
    handleFormSubmit,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}

export default ChatContext;
