import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const DataCard = ({ title, value, color }) => {
  const theme = useTheme(); // Access the current theme

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
    <HistogramContainer className="small-card">
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
    </HistogramContainer>
  );
};

export default DataCard;
