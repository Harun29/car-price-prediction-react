import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useChat } from "../Context/ChatContext";
import "../Style/Chat.css";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);
  const iconRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingMessageRef = useRef(null);

  const { messages, handleFormSubmit } = useChat();

  const handleOpenChat = () => {
    setChatOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      chatRef.current &&
      !chatRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      setChatOpen(false);
    }
  };

  useEffect(() => {
    if (chatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatOpen]);

  const submitForm = async (event) => {
    event.preventDefault();
    const message = typingMessageRef.current.value;
    await handleFormSubmit(event, message);
    typingMessageRef.current.value = '';
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
  }));

  return (
    <div>
      <div
        ref={iconRef}
        onClick={handleOpenChat}
        className="open-chat"
        role="button"
      >
        <AutoAwesomeIcon style={{ color: "white" }} />
      </div>
      {chatOpen && (
        <HistogramContainer className="chat" ref={chatRef}>
          <div className="chat-heading">
            <h3>Chat with Jarvis</h3>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "my-message" : "ai-message"
                }
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} id="bottom-of-chat"></div>
          </div>

          <div className="chat-input-container">
            <form onSubmit={submitForm} style={{ width: "100%" }}>
              <input
                className="chat-input"
                type="text"
                placeholder="Type a message..."
                ref={typingMessageRef}
                autoFocus
              />
              <button type="submit">
                <SendIcon />
              </button>
            </form>
          </div>
        </HistogramContainer>
      )}
    </div>
  );
};

export default Chat;
