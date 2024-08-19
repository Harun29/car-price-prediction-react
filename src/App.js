import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import { PandasProvider } from "./Context/PandasContext";
import { MLProvider } from "./Context/MLContext";
import DataAnalysisPage from "./Pages/DataAnalysisPage";
import HomePage from "./Pages/HomePage";
import Chat from "./Components/Chat";

function App() {
  const [theme, setTheme] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
      <Chat />
    </ThemeProvider>
  );
}

export default App;