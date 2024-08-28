import { useTheme } from "@nivo/core";
import "../../Style/DataAnalysis.css"
import { useState } from "react";
import { styled } from "@mui/material/styles";
import HeatMap from "../Basic Overview/HeatMap";
import MapComponent from "../../Components/MapComponent";

const BasicOverview = () => {

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
      <h3 className="data-analysis-headers">Quick Overview</h3>
      <HistogramContainer className="plot-box heat-map">
        <span>Correlations Heat Map</span>
        {!loading && <HeatMap />}
      </HistogramContainer>
      <HistogramContainer className="plot-box map">
        <span>Car Count per City</span>
        <MapComponent />
      </HistogramContainer>
    </div>
  );
};

export default BasicOverview;
