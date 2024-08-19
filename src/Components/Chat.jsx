import React, { useState, useEffect } from "react";
import "../Style/Chat.css";
import { styled, useTheme } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { OpenAI } from "openai";

const Chat = () => {
  const theme = useTheme();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Jarvis, your AI assistant powered by GPT-4o-mini. I'm here to help you with any questions or tasks you have. Just type in your message, and I'll do my best to assist you. How can I help you today?",
    },
  ]);

  const [typingMessage, setTypingMessage] = useState("");

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
  }));

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async (userMessage) => {
    if (userMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          { role: "user", content: userMessage },
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements["chat-input"];
    handleSendMessage(input.value);
    input.value = "";
  };

  return (
    <HistogramContainer className="chat">
      <div className="chat-heading">
        <h3>Chat with Jarvis</h3>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "my-message" : "ai-message"}
          >
            {message.content}
          </div>
        ))}
        {typingMessage && (
          <div className="ai-message">
            {typingMessage}
            <span className="cursor">|</span>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <form onSubmit={handleFormSubmit}>
          <input
            className="chat-input"
            name="chat-input"
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </HistogramContainer>
  );
};

export default Chat;
