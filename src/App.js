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

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <ChatProvider>
      <PandasProvider>
        <MLProvider>
          <ThemeProvider theme={darkTheme}>
            <Router>
              <div className="App">
                <Navbar theme={theme} handleThemeChange={handleThemeChange} />
                <CssBaseline />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/price-prediction" element={<HomePage />} />
                  <Route path="/data-analysis" element={<DataAnalysisPage />} />
                </Routes>
                <img
                  className="home-page-bloomteq-symbol"
                  src="bloomteq-logo.png"
                  alt=""
                />
                <div
                  ref={iconRef}
                  onClick={handleOpenChat}
                  className="open-chat"
                  role="button"
                >
                  <AutoAwesomeIcon />
                </div>
              </div>
            </Router>
            {chatOpen && <Chat chatRef={chatRef} />}
          </ThemeProvider>
        </MLProvider>
      </PandasProvider>
    </ChatProvider>
  );
}

export default App;
