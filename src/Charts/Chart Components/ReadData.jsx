import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const ReadData = ({ selectedCar }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupBy, setGroupBy] = useState("");
  const [valueColumn, setValueColumn] = useState("");
  const [aggregationFunction, setAggregationFunction] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [originalColumns, setOriginalColumns] = useState([]);

  useEffect(() => {
    handleFileFetch();
  }, [selectedCar]);

  const handleFileFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ml-flask-server-production.up.railway.app/get_csv", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const result = await response.json();
      const data = result;

      if (data.length > 0) {
        const columns = Object.keys(data[0]).map((key) => ({
          title: key,
          field: key,
        }));
        setColumns(columns);
        setOriginalColumns(columns);
        setTableData(data);
        setOriginalData(data);
      } else {
        console.log("Data length is zero");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleValueColumnChange = (event) => {
    setValueColumn(event.target.value);
  };

  const handleAggregationFunctionChange = (event) => {
    setAggregationFunction(event.target.value);
  };

  const handleGroupBy = async () => {
    try {
      const response = await fetch("https://ml-flask-server-production.up.railway.app/group_by", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column_name: groupBy,
          value_column: valueColumn,
          aggregation_function: aggregationFunction,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to group by");
      }

      const result = await response.json();
      const data = result.grouped_data;

      if (data.length > 0) {
        const columns = Object.keys(data[0]).map((key) => ({
          title: key,
          field: key,
        }));
        setColumns(columns);
        setTableData(data);
      }
    } catch (err) {
      console.error("Failed grouping dataset: ", err);
    }
  };

  const handleRefresh = () => {
    const columns = Object.keys(originalData[0]).map((key) => ({
      title: key,
      field: key,
    }));
    setColumns(columns);
    setTableData(originalData);
    setGroupBy("");
    setValueColumn("");
    setAggregationFunction("");
  };

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
    <div className="data-analysis-container table-data-container">
      <div className="table-data">
        {loading ? (
          <HistogramContainer>
            <div className="skeleton-holder">
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
            </div>
            <div className="skeleton-holder">
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
              <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: "2rem" }}
                width="100%"
              />
            </div>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height={600}
            />
          </HistogramContainer>
        ) : (
          <HistogramContainer>
            {tableData.length > 0 && (
              <MaterialTable
                title={`All The Data`}
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
          </HistogramContainer>
        )}
      </div>
      <div className="control-buttons group-by-container">
        {tableData.length > 0 && (
          <>
            <FormControl fullWidth>
              <InputLabel id="group-by-label">Group By</InputLabel>
              <Select
                labelId="group-by-label"
                id="group-by"
                value={groupBy}
                label="Group By"
                onChange={handleGroupByChange}
              >
                {originalColumns.map((column) => (
                  <MenuItem key={column.field} value={column.field}>
                    {column.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="value-column-label">Value Column</InputLabel>
              <Select
                labelId="value-column-label"
                id="value-column"
                value={valueColumn}
                label="Value Column"
                onChange={handleValueColumnChange}
              >
                {originalColumns.map((column) => (
                  <MenuItem key={column.field} value={column.field}>
                    {column.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="aggregation-function-label">
                Aggregation Function
              </InputLabel>
              <Select
                labelId="aggregation-function-label"
                id="aggregation-function"
                value={aggregationFunction}
                label="Aggregation Function"
                onChange={handleAggregationFunctionChange}
              >
                <MenuItem value="mean">Mean</MenuItem>
                <MenuItem value="sum">Sum</MenuItem>
                <MenuItem value="count">Count</MenuItem>
                <MenuItem value="max">Max</MenuItem>
                <MenuItem value="min">Min</MenuItem>
              </Select>
            </FormControl>

            <Button
              disabled={loading}
              className="group-by-button"
              onClick={handleGroupBy}
              variant="outlined"
            >
              Group By
            </Button>

            <Button
              disabled={loading}
              className="group-by-button"
              onClick={handleRefresh}
              variant="outlined"
            >
              Original Data
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadData;
