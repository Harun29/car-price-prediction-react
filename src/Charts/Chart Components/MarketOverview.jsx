import MyHistogram from "../Market Overview/HistPlot";
import DataCard from "../Market Overview/DataCard";
import ModelRankingPieChart from "../Market Overview/ModelRandkingChart";
import { styled } from "@mui/material/styles";
import ModelListingsChart from "../Market Overview/ModelListings";
import AveragePriceHistogram from "../Market Overview/ModelsAveragePrice";
import ModelsPriceBoxPlot from "../Market Overview/ModelsPriceBox";
import PriceDistributionLineChart from "../Market Overview/LinePlot";
import { useState, useEffect } from "react";
import "../../Style/DataAnalysis.css";

const MarketOverview = ({selectedCar}) => {
  const [meanPrice, setMeanPrice] = useState(0);
  const [medianPrice, setMedianPrice] = useState(0);
  const [firsQuartile, setFirstQuartile] = useState(0);
  const [thirdQuartile, setThirdQuartile] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const url = "https://ml-flask-server-production.up.railway.app/get_prices";
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
      <h3 className="data-analysis-headers">Top Models by Popularity</h3>
      <HistogramContainer className="plot-box model-ranking">
        <span>most popular models</span>
        {!loading && <ModelRankingPieChart />}
      </HistogramContainer>

      <HistogramContainer className="plot-box model-listings">
        <span>model listings</span>
        {!loading && <ModelListingsChart />}
      </HistogramContainer>

      <h3 className="data-analysis-headers">Price Distribution</h3>
      <HistogramContainer className="plot-box histplot">
        <span>Overall Price Distribution</span>
        {!loading && <MyHistogram />}
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

      {/* <HistogramContainer className="plot-box price-range">
        <span>range of car prices</span>
        {!loading && <PriceRangeHorizontalBarChart />}
      </HistogramContainer> */}
      <h3 className="data-analysis-headers">Price by Model</h3>
      <HistogramContainer className="plot-box average-price">
        <span>average price for 25 most popular models</span>
        {!loading && <AveragePriceHistogram />}
      </HistogramContainer>
      <HistogramContainer className="plot-box price-boxplot">
        <span>price variance for 10 most popular models</span>
        {!loading && <ModelsPriceBoxPlot />}
      </HistogramContainer>
      <HistogramContainer className="plot-box price-line">
        <span>Price distribution for 5 most popular models</span>
        {!loading && <PriceDistributionLineChart />}
      </HistogramContainer>
    </div>
  );
};

export default MarketOverview;
