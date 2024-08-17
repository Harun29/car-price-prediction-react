import { useState } from "react";
import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { usePandas } from "../Context/PandasContext";
import MyHistogram from "../Charts/HistPlot";
import "../Style/DataAnalysis.css";
import { Typography } from "@mui/material";
import PriceRangeHorizontalBarChart from "../Charts/ResponsiveBar";
import DataCard from "../Charts/DataCard";
import ModelRankingPieChart from "../Charts/ModelRandkingChart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import ModelListingsChart from "../Charts/ModelListings";
import AveragePriceHistogram from "../Charts/ModelsAveragePrice";
import ModelsPriceBoxPlot from "../Charts/ModelsPriceBox";
import PriceDistributionLineChart from "../Charts/LinePlot";
import TableChartIcon from '@mui/icons-material/TableChart';

const DataAnalysisPage = () => {

  const [selectedLogo, setSelectedLogo] = useState("vw");

  const changeToAudi = () =>{
    setSelectedLogo("audi");
  }
  const changeToVw = () =>{
    setSelectedLogo("vw");
  }

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  }));

  const NavbarContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "-3px -3px 8px #bcbcbc, 3px 3px 8px #ffffff"
        : "-2px -2px 8px #000000, 2px 2px 8px #000000",
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  }));

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const { tableData, columns, duplicates, shape, handleFileUpload } =
    usePandas();

  const fileUploadFunction = async (event) => {
    try {
      await handleFileUpload(event);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="data-analysis">
      <NavbarContainer className="data-analysis-top-navbar heading">
        <span>Market Overview</span>
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
      <div className="data-analysis-container">
        <h3 className="data-analysis-headers">Top Models by Popularity</h3>
        <HistogramContainer className="plot-box model-ranking">
          <span>most popular models</span>
          <ModelRankingPieChart />
        </HistogramContainer>

        <HistogramContainer className="plot-box model-listings">
          <span>model listings</span>
          <ModelListingsChart />
        </HistogramContainer>

        <h3 className="data-analysis-headers">Price Distribution</h3>
        <HistogramContainer className="plot-box histplot">
          <span>Overall Price Distribution</span>
          <MyHistogram />
        </HistogramContainer>

        <DataCard title="Average Price" value="KM 17500" color="#4caf50" />
        <DataCard title="Median Price" value="KM 15444" color="#2196f3" />
        <DataCard title="25% Price" value="KM 32400" color="#ff9800" />
        <DataCard title="75% Price" value="KM 9500" color="#f44336" />

        <HistogramContainer className="plot-box price-range">
          <span>range of car prices</span>
          <PriceRangeHorizontalBarChart />
        </HistogramContainer>
        <h3 className="data-analysis-headers">Price by Model</h3>
        <HistogramContainer className="plot-box average-price">
          <span>average price for 25 most popular models</span>
          <AveragePriceHistogram />
        </HistogramContainer>
        <HistogramContainer className="plot-box price-boxplot">
          <span>price variance for 10 most popular models</span>
          <ModelsPriceBoxPlot />
        </HistogramContainer>
        <HistogramContainer className="plot-box price-line">
          <span>Price distribution for 5 most popular models</span>
          <PriceDistributionLineChart />
        </HistogramContainer>

      </div>
      <div className="right-side-data-analysis">
        <div className="data-tabs">
          <span className="data-analysis-header">Data Analysis</span>
          <div className="horizontal-line"></div>
          <Button>
            <BarChartIcon />
            Basic Overview
          </Button>
          <Button>
            <QueryStatsIcon />
            Market Overview
          </Button>
          <Button>
            <PriceChangeIcon />
            Price Influencers
          </Button>
          <Button>
            <AssignmentIcon />
            Specifications and Features
          </Button>
          <Button>
            <TableChartIcon />
            Read Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisPage;
