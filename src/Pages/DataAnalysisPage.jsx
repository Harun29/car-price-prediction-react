import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../Style/DataAnalysis.css";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import MarketOverview from "../Charts/Chart Components/MarketOverview";
import PriceInfluencers from "../Charts/Chart Components/PriceInfluencers";
import BasicOverview from "../Charts/Chart Components/BaicOverview";
import ReadData from "../Charts/Chart Components/ReadData";

const DataAnalysisPage = () => {
  const [selectedLogo, setSelectedLogo] = useState("vw");
  const [selectedData, setSelectedData] = useState("basic-overview");

  const changeCarModel = async(model) => {
    try{
      const response = await fetch("https://ml-flask-server-production.up.railway.app/select_brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "brand": model }),
      });

      if (!response.ok) {
        throw new Error("Failed to change brand");
      } else {
        return "successful";
      }

    }catch(err){
      console.error("Error in changing car model: ", err)
    }
  }

  const changeToAudi = async() => {
    await changeCarModel("audi")
    setSelectedLogo("audi");
  };
  const changeToVw = async() => {
    await changeCarModel("volkswagen")
    setSelectedLogo("vw");
  };

  const NavbarContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "-3px -3px 8px #bcbcbc, 3px 3px 8px #ffffff"
        : "-2px -2px 8px #000000, 2px 2px 8px #000000",
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  }));

  const handleSelectedData = (type) => {
    setSelectedData(type);
  };

  return (
    <div className="data-analysis">
      <NavbarContainer className="data-analysis-top-navbar heading">
        <span>
          {selectedData === "basic-overview"
            ? "Quick Overview"
            : selectedData === "market-overview"
              ? "Market Overview"
              : selectedData === "price-influencers"
                ? "Price Influencers"
                : "Reading Data"}
        </span>
      </NavbarContainer>
      <NavbarContainer className="data-analysis-top-navbar logos">
        <div>
          <img
            onClick={changeToAudi}
            className={selectedLogo === "audi" && "data-selected-logo"}
            src="audi-logo.png"
            alt="Audi Logo"
          />
          <img
            onClick={changeToVw}
            className={selectedLogo === "vw" && "data-selected-logo"}
            src="vw-logo.png"
            alt="VW Logo"
          />
        </div>
      </NavbarContainer>
      {selectedData === "basic-overview" && <BasicOverview selectedCar={selectedLogo}/>}
      {selectedData === "market-overview" && <MarketOverview selectedCar={selectedLogo}/>}
      {selectedData === "price-influencers" && <PriceInfluencers />}
      {selectedData === "read-data" && <ReadData selectedCar={selectedLogo}/>}
      <div className="right-side-data-analysis">
        <div className="data-tabs">
          <span className="data-analysis-header">Data Analysis</span>
          <div className="horizontal-line"></div>
          <Button
            className={`data-tabs-button ${selectedData === "basic-overview" ? "active" : ""}`}
            onClick={() => handleSelectedData("basic-overview")}
          >
            <BarChartIcon />
            Basic Overview
          </Button>
          <Button
            className={`data-tabs-button ${selectedData === "market-overview" ? "active" : ""}`}
            onClick={() => handleSelectedData("market-overview")}
          >
            <QueryStatsIcon />
            Market Overview
          </Button>
          <Button
            className={`data-tabs-button ${selectedData === "price-influencers" ? "active" : ""}`}
            onClick={() => handleSelectedData("price-influencers")}
          >
            <PriceChangeIcon />
            Price Influencers
          </Button>
          <Button
            className={`data-tabs-button ${selectedData === "read-data" ? "active" : ""}`}
            onClick={() => handleSelectedData("read-data")}
          >
            <TableChartIcon />
            Read Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisPage;
