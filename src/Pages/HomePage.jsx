import { useState } from "react";
import { Button } from "@mui/material";
import MaterialTable from "@material-table/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import "../Style/HomePage.css";
import { usePandas } from "../Context/PandasContext";

const HomePage = () => {
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

  const {
    tableData,
    columns,
    nansColumns,
    nansTableData,
    descTableData,
    descColumns,
    groupedTableData,
    groupedColumns,
    duplicates,
    shape,
    handleDropNa,
    handleFillNa,
    handleGroupBy,
    handleFileUpload,
  } = usePandas();

  const [deleteCol, setDeleteCol] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [valueColumn, setValueColumn] = useState("");
  const [aggregationFunction, setAggregationFunction] = useState("");

  const [fillValue, setFillValue] = useState("");
  const [fillMethod, setFillMethod] = useState("");
  const [fillColumn, setFillColumn] = useState("");
  const [dropAxis, setDropAxis] = useState(0);
  const [dropHow, setDropHow] = useState("any");

  const dropNaFunction = async () => {
    try {
      await handleDropNa(dropAxis, dropHow);
    } catch (err) {
      console.error(err);
    }
  };

  const fillNaFunction = async () => {
    try {
      await handleFillNa(fillValue, fillMethod, fillColumn);
    } catch (err) {
      console.error(err);
    }
  };

  const groupByFunction = async () => {
    try {
      await handleGroupBy(groupBy, valueColumn, aggregationFunction);
    } catch (err) {
      console.error(err);
    }
  };

  const fileUploadFunction = async (event) => {
    try {
      await handleFileUpload(event);
    } catch (err) {
      console.error(err);
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

  const handleDelChange = (event) => {
    setDeleteCol(event.target.value);
  };

  const handleFillValueChange = (event) => {
    setFillValue(event.target.value);
  };

  const handleFillMethodChange = (event) => {
    setFillMethod(event.target.value);
  };

  const handleFillColumnChange = (event) => {
    setFillColumn(event.target.value);
  };

  const handleDropAxisChange = (event) => {
    setDropAxis(event.target.value);
  };

  const handleDropHowChange = (event) => {
    setDropHow(event.target.value);
  };

  return (
    <div className="home-page-container">
      <div>
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

        <div className="reading-data-inputs main">
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
        </div>
        <div className="control-buttons">
          {tableData.length > 0 && (
            <div>
              <Button className="refresh-button" variant="outlined">
                Refresh
              </Button>
              {duplicates > 0 && (
                <Button className="refresh-button" variant="outlined">
                  Drop duplicates
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="main-info-container">
          <div className="reading-data-inputs nans">
            {nansTableData.length > 0 && (
              <MaterialTable
                title="NaN Values"
                columns={nansColumns}
                data={nansTableData}
                options={{
                  search: true,
                  sorting: false,
                }}
              />
            )}
          </div>
          <div className="reading-data-inputs desc">
            {descTableData.length > 0 && (
              <MaterialTable
                title="Description"
                columns={descColumns}
                data={descTableData}
                options={{
                  search: true,
                  sorting: false,
                }}
              />
            )}
          </div>
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
                  {columns.map((column) => (
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
                  {columns.map((column) => (
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

              <Button onClick={groupByFunction} variant="outlined">
                Group By
              </Button>
            </>
          )}
        </div>
        <div className="reading-data-inputs grouped">
          {groupedTableData.length > 0 && (
            <MaterialTable
              title={`Grouped By -- ${aggregationFunction.toUpperCase()}`}
              columns={groupedColumns}
              data={groupedTableData}
              options={{
                search: true,
                sorting: false,
                exportButton: true,
              }}
            />
          )}
        </div>
        <div className="control-buttons group-by-container">
          {tableData.length > 0 && (
            <>
              <FormControl fullWidth>
                <InputLabel id="fillna-label">Fill NaN Value</InputLabel>
                <TextField
                  id="fillna-input"
                  value={fillValue}
                  onChange={handleFillValueChange}
                  label="Fill NaN Value"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="fill-method-label">Fill Method</InputLabel>
                <Select
                  labelId="fill-method-label"
                  id="fill-method"
                  value={fillMethod}
                  label="Fill Method"
                  onChange={handleFillMethodChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="ffill">Forward Fill</MenuItem>
                  <MenuItem value="bfill">Backward Fill</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="fill-column-label">Fill Column</InputLabel>
                <Select
                  labelId="fill-column-label"
                  id="fill-column"
                  value={fillColumn}
                  label="Fill Column"
                  onChange={handleFillColumnChange}
                >
                  <MenuItem value="">
                    <em>All Columns</em>
                  </MenuItem>
                  {columns.map((column) => (
                    <MenuItem key={column.field} value={column.field}>
                      {column.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={fillNaFunction} variant="outlined">
                Fill NaNs
              </Button>
            </>
          )}
        </div>
        <div className="control-buttons group-by-container">
          {tableData.length > 0 && (
            <>
              <FormControl fullWidth>
                <InputLabel id="dropna-axis-label">Drop NaN Axis</InputLabel>
                <Select
                  labelId="dropna-axis-label"
                  id="dropna-axis"
                  value={dropAxis}
                  label="Drop NaN Axis"
                  onChange={handleDropAxisChange}
                >
                  <MenuItem value={0}>Rows</MenuItem>
                  <MenuItem value={1}>Columns</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="dropna-how-label">Drop NaN How</InputLabel>
                <Select
                  labelId="dropna-how-label"
                  id="dropna-how"
                  value={dropHow}
                  label="Drop NaN How"
                  onChange={handleDropHowChange}
                >
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={dropNaFunction} variant="outlined">
                Drop NaNs
              </Button>
            </>
          )}
        </div>
        <div className="control-buttons group-by-container">
          {tableData.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Drop Col</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deleteCol}
                label="Drop Col"
                onChange={handleDelChange}
              >
                {columns.map((column) => (
                  <MenuItem key={column.field} value={column.field}>
                    {column.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {tableData.length > 0 && (
            <Button variant="outlined">Drop Column</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
