import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useChat } from "../Context/ChatContext";
import "../Style/Chat.css";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);
  const iconRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingMessageRef = useRef(null);
  const [error, setError] = useState(false);

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
    setError(false);

    const message = typingMessageRef.current.value.trim();
    if (!message) return;

    typingMessageRef.current.value = "";

    try {
      const response = await handleFormSubmit(event, message);
      console.log("response: ", response)
      if (response !== "ok") {
        setError(true);
      }
    } catch (err) {
      console.error("ERROR IN CHAT! ", err);
      setError(true);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    console.log("error state: ", error)
  }, [error])

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "black",
      boxShadow: theme.shadows[1],
      fontSize: 16,
    },
  }));

  return (
    <div>
      <LightTooltip title="Chat with Jarvis" placement="left">
        <div
          ref={iconRef}
          onClick={handleOpenChat}
          className="open-chat"
          role="button"
        >
          <AutoAwesomeIcon style={{ color: "white" }} />
        </div>
      </LightTooltip>

      {chatOpen && (
        <div className="chat" ref={chatRef}>
          <div className="chat-heading">
            <div>
              <img
                className="chat-bot-image"
                src="chat-bot.avif"
                alt="chat bot"
              />
              {error ? (
                <Alert style={{backgroundColor: "inherit", padding: "0", height: "50%", color: "red"}} severity="error" className="chat-error">
                  There was something wrong with CarMate!
                </Alert>
              ) : (
                <h3>CarMate</h3>
              )}
            </div>
            <CloseIcon
              onClick={handleOpenChat}
              className="close-icon"
            ></CloseIcon>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "my-message" : "ai-message"
                }
              >
                <img
                  className="chat-bot-image in-chat ai-image"
                  src="chat-bot.avif"
                  alt="chat bot"
                />
                <img
                  className="chat-bot-image in-chat user-image"
                  src="user-image.jpeg"
                  alt="user"
                />
                <div className="message-content">{message.content}</div>
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
        </div>
      )}
    </div>
  );
};

export default Chat;
