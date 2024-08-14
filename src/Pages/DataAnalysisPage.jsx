import { Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { usePandas } from "../Context/PandasContext";
import MyHistogram from "../Charts/HistPlot";
import "../Style/DataAnalysis.css";
import { Typography } from "@mui/material";
import PriceRangeHorizontalBarChart from "../Charts/ResponsiveBar";
import DataCard from "../Charts/DataCard";
import ModelRankingPieChart from "../Charts/ModelRandkingChart";

const DataAnalysisPage = () => {
  const theme = useTheme(); // Access the current theme

  // Styled component with theme-based box-shadow
  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "9px 9px 18px #666666, -9px -9px 18px #333333",
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
      <div className="data-analysis-container">
        <DataCard title="Average Price" value="KM 17500" color="#4caf50" />
        <DataCard title="Median Price" value="KM 15444" color="#2196f3" />
        <DataCard title="25% Price" value="KM 32400" color="#ff9800" />
        <DataCard title="75% Price" value="KM 9500" color="#f44336" />

        <HistogramContainer className="plot-box histplot">
          <span>Overall Price Distribution</span>
          <MyHistogram />
        </HistogramContainer>

        <HistogramContainer className="plot-box price-range">
          <span>range of car prices</span>
          <PriceRangeHorizontalBarChart />
        </HistogramContainer>

        <HistogramContainer className="plot-box model-ranking">
          <span>most popular models</span>
          <ModelRankingPieChart />
        </HistogramContainer>
      </div>
      <div className="right-side-data-analysis">
        <div className="data-tabs">
          <Button>Market Overview</Button>
          <Button>Price Influencers</Button>
          <Button>Specifications and Features</Button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisPage;
