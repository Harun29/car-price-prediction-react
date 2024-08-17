import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Navbar from "./Components/Navbar";
import { PandasProvider } from "./Context/PandasContext";
import { MLProvider } from "./Context/MLContext";
// import PredictionsPage from "./Pages/Predictions";
import DataAnalysisPage from "./Pages/DataAnalysisPage";
import HomePage from "./Pages/HomePage";

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
          <Navbar theme={theme} handleThemeChange={handleThemeChange}/>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/price-prediction" element={
              <MLProvider>
                <HomePage />
              </MLProvider>
            } />
            <Route path="/data-analysis" element={
              <PandasProvider>
                <DataAnalysisPage />
              </PandasProvider>
            } />
            {/* <Route path="/update-data" element={
              <PandasProvider>
                <MLProvider>
                  <DataAnalysisPage />
                </MLProvider>
              </PandasProvider>
            } /> */}
          </Routes>
        </div>
        <img className="home-page-bloomteq-symbol" src="bloomteq-logo.png" alt="" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
