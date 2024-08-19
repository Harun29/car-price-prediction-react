import "../Style/Chat.css";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../Context/ChatContext";
import { useEffect } from "react";

const Chat = ({ chatRef }) => {
  const {
    messages,
    typingMessage,
    userMessage,
    handleUserMessageChange,
    handleFormSubmit,
  } = useChat();

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
  }));

  return (
    <HistogramContainer className="chat" ref={chatRef}>
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
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <input
            className="chat-input"
            type="text"
            placeholder="Type a message..."
            value={userMessage}
            onChange={handleUserMessageChange}
            autoFocus
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
