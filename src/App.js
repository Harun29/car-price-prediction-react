import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useRef, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { PandasProvider } from "./Context/PandasContext";
import { MLProvider } from "./Context/MLContext";
import DataAnalysisPage from "./Pages/DataAnalysisPage";
import HomePage from "./Pages/HomePage";
import Chat from "./Components/Chat";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { ChatProvider } from "./Context/ChatContext";

function App() {
  const [theme, setTheme] = useState("dark");
  const [chatOpen, setChatOpen] = useState(false);
  const chatRef = useRef(null);
  const iconRef = useRef(null);

  const handleOpenChat = (event) => {
    event.preventDefault();
    setChatOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    event.preventDefault();
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatOpen]);

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const handleThemeChange = (event) => {
    event.preventDefault();
    setTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ChatProvider>
        <Router>
          <div className="App">
            <Navbar theme={theme} handleThemeChange={handleThemeChange} />
            <CssBaseline />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/price-prediction"
                element={
                  <MLProvider>
                    <HomePage />
                  </MLProvider>
                }
              />
              <Route
                path="/data-analysis"
                element={
                  <PandasProvider>
                    <DataAnalysisPage />
                  </PandasProvider>
                }
              />
            </Routes>
            <img
              className="home-page-bloomteq-symbol"
              src="bloomteq-logo.png"
              alt=""
            />
          </div>
        </Router>
        <div
          ref={iconRef}
          onClick={(e) => handleOpenChat(e)}
          className="open-chat"
          role="button"
        >
          <AutoAwesomeIcon />
        </div>

        {chatOpen && <Chat chatRef={chatRef} />}
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
