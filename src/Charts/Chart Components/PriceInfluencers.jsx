import "../../Style/DataAnalysis.css";
import { styled } from "@mui/material/styles";
import HeatMap from "../Price Influencers/HeatMap";
import LinePlot from "../Price Influencers/LinePlot";
import PiePlot from "../Price Influencers/PiePlot";
import BarChart from "../Price Influencers/BarChart";
import BarChart2 from "../Price Influencers/BarChart2";

const PriceInfluencers = () => {

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
      <HistogramContainer className="plot-box heat-map">
        <span>Correlations Heat Map</span>
        <HeatMap />
      </HistogramContainer>
      <HistogramContainer className="plot-box pie-plot">
        <span>Average prices per model</span>
        <PiePlot />
      </HistogramContainer>
      <HistogramContainer className="plot-box line-plot">
        <span>Line Plot</span>
        <LinePlot />
      </HistogramContainer>
      <HistogramContainer className="plot-box bar-chart">
        <span>Most popular models - price by production year</span>
        <BarChart />
      </HistogramContainer>
      <HistogramContainer className="plot-box bar-chart-2">
        <span>Most popular types - price by production year</span>
        <BarChart2 />
      </HistogramContainer>
    </div>
  );
};

export default PriceInfluencers;
