import { Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import "../Style/DataAnalysis.css";
import { usePandas } from "../Context/PandasContext";
import ArcDesign from "../Charts/GaugePlot";
import ArcDesign2 from "../Charts/GaugePlot2";
import BasicScatter from "../Charts/ScatterPlot";
import BasicPie from "../Charts/PiePlot";
import BasicPie2 from "../Charts/PiePlot2";
import BasicBars from "../Charts/BarPlot";

const DataAnalysisPage = () => {
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

        <div className="bar-plot">
          <BasicBars />
        </div>

        <div className="gauge-plot">
          <ArcDesign />
        </div>

        <div className="gauge-plot">
          <ArcDesign2 />
        </div>

        <div className="pie-plot">
          <BasicPie />
        </div>

        <div className="scatter-plot">
          <BasicScatter />
        </div>

        <div className="pie-plot">
          <BasicPie2 />
        </div>


        {/* <div className="reading-data-inputs main">
          {tableData.length > 0 && (
            <MaterialTable
              title={`CSV Data -- Shape: ${shape} -- Duplicates: ${duplicates}`}
              columns={columns}
              data={tableData}
              options={{
                search: true,
                paging: true,
                exportButton: true,
                sorting: false,
              }}
            />
          )}
        </div> */}
      </div>
      <div className="home-page-right-side data-analysis">
      <div className="data-loading">
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload csv
            <VisuallyHiddenInput type="file" onChange={fileUploadFunction} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisPage;
