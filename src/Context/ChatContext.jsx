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
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5000/get_csv', {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  
  //       console.log("Response status:", response.status);
  //       console.log("Response headers:", response.headers);
        
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       console.log("About to parse JSON");
  //       try {
  //         const data = await response.json();
  //         console.log("Fetched data:", data);
  //         setData(data);
  //       } catch (jsonError) {
  //         console.error("Error parsing JSON:", jsonError);
  //       }
  
  //       setData(data);
  
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  
  // useEffect(() => {
  //   data && console.log("dataaa: ", data)
  // }, [data])

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
          // { role: "system", content: `Relevant data: ${data}` },
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
