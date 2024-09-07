import { useTheme } from "@nivo/core";
import "../../Style/DataAnalysis.css";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MapComponent from "../../Components/MapComponent";
import DataCard from "../Market Overview/DataCard";
import ModelRankingPieChart from "../Market Overview/ModelRandkingChart";
import MyHistogram from "../Market Overview/HistPlot";
import PriceDistributionLineChart from "../Market Overview/LinePlot";
import BarChart from "../Price Influencers/BarChart";
import PiePlot from "../Price Influencers/PiePlot";

const BasicOverview = ({selectedCar}) => {
  const [meanPrice, setMeanPrice] = useState(0);
  const [medianPrice, setMedianPrice] = useState(0);
  const [firsQuartile, setFirstQuartile] = useState(0);
  const [thirdQuartile, setThirdQuartile] = useState(0);

  const getData = async () => {
    const url = "http://127.0.0.1:5000/get_prices";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMeanPrice(result.mean_price);
      setMedianPrice(result.median_price);
      setFirstQuartile(result.first_quantile);
      setThirdQuartile(result.third_quantile);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCar]);

  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div className="data-analysis-container">
      <HistogramContainer className="plot-box map-quick-overview">
        <span>Car Count per City</span>
        <MapComponent />
      </HistogramContainer>
      <DataCard
        title="Average Price"
        value={`KM ${meanPrice}`}
        color="#4caf50"
      />
      <DataCard
        title="Median Price"
        value={`KM ${medianPrice}`}
        color="#2196f3"
      />
      <DataCard
        title="25% Price"
        value={`KM ${firsQuartile}`}
        color="#ff9800"
      />
      <DataCard
        title="75% Price"
        value={`KM ${thirdQuartile}`}
        color="#f44336"
      />
      <HistogramContainer className="plot-box model-ranking quick-overview">
        <span>most popular models</span>
        {!loading && <ModelRankingPieChart/>}
      </HistogramContainer>
      <HistogramContainer className="plot-box price-line quick-overview">
        <span>Price distribution for 5 most popular models</span>
        {!loading && <PriceDistributionLineChart />}
      </HistogramContainer>
      <HistogramContainer className="plot-box pie-plot quick-overview">
        <span>Pie Plot</span>
        {!loading && <PiePlot />}
      </HistogramContainer>
      <HistogramContainer className="plot-box histplot quick-overview">
        <span>Overall Price Distribution</span>
        {!loading && <MyHistogram />}
      </HistogramContainer>
      <HistogramContainer className="plot-box bar-chart quick-overview">
        <span>Most popular models - price by years</span>
        {!loading && <BarChart />}
      </HistogramContainer>
    </div>
  );
};

export default BasicOverview;
