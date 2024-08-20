import React, { createContext, useState, useContext, useEffect } from "react";
import { OpenAI } from "openai";

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Jarvis, your AI assistant powered by GPT-4o-mini. I'm here to help you with any questions or tasks you have. Just type in your message, and I'll do my best to assist you. How can I help you today?",
    },
  ]);

  const [typingMessage, setTypingMessage] = useState("");

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          { role: "user", content: message },
        ],
      });

      const aiMessage = completion.choices[0].message.content;
      simulateTypingEffect(aiMessage);
    } catch (err) {
      console.error(err);
    }
  };

  const simulateTypingEffect = (message) => {
    let index = 0;
    setTypingMessage("");

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setTypingMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: message },
        ]);
        setTypingMessage("");
      }
    }, 10);
  };

  const handleFormSubmit = async (event, message) => {
    event.preventDefault();
    try {
      await handleSendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    console.log(messages)
  }, [messages])
  

  const values ={
    messages,
    typingMessage,
    handleFormSubmit,
  }

  return (
    <ChatContext.Provider
      value={values}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
