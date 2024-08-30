import "../Style/Chat.css";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../Context/ChatContext";
import { useState, useRef, useEffect } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);
  const iconRef = useRef(null);

  const { messages, typingMessage, handleFormSubmit } = useChat();

  const handleOpenChat = () => {
    console.log("Toggling chatOpen:", !chatOpen); // Debugging log
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

  const [userMessage, setUserMessage] = useState("");

  const handleUserMessageChange = (event) => {
    event.preventDefault();
    setUserMessage(event.target.value);
  };

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
  }));

  const submitForm = async (event) => {
    event.preventDefault();
    await handleFormSubmit(event, userMessage);
    setUserMessage("");
  };

  return (
    <div>
      <div
        ref={iconRef}
        onClick={handleOpenChat}
        className="open-chat"
        role="button"
      >
        <AutoAwesomeIcon />
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
            {typingMessage && (
              <div className="ai-message">
                {typingMessage}
                <span className="cursor">|</span>
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <form onSubmit={submitForm} style={{ width: "100%" }}>
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
      )}
    </div>
  );
};

export default Chat;
