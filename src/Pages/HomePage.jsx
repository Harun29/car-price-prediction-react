import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import MaterialTable from "@material-table/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "../Style/HomePage.css";

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [nansTableData, setNansTableData] = useState([]);
  const [nansColumns, setNansColumns] = useState([]);

  const [descTableData, setDescTableData] = useState([]);
  const [descColumns, setDescColumns] = useState([]);

  const [groupedTableData, setGroupedTableData] = useState([]);
  const [groupedColumns, setGroupedColumns] = useState([]);

  const [shape, setShape] = useState();
  const [duplicates, setDuplicates] = useState();
  const [deleteCol, setDeleteCol] = useState("");

  const [groupBy, setGroupBy] = useState("");
  const [valueColumn, setValueColumn] = useState("");
  const [aggregationFunction, setAggregationFunction] = useState("");

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

  useEffect(() => {
    groupBy && console.log(groupBy);
  }, [groupBy]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload_csv", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const result = await response.json();
        const data = result.data;
        const nans = result.nans;
        const desc = result.description;

        if (data.length > 0) {
          const columns = Object.keys(data[0]).map((key) => ({
            title: key,
            field: key,
          }));
          const nanColumns = Object.keys(nans[0]).map((key) => ({
            title: key,
            field: key,
          }));
          const descColumns = Object.keys(desc[0]).map((key) => ({
            title: key,
            field: key,
          }));

          setColumns(columns);
          setTableData(data);
          setNansColumns(nanColumns);
          setNansTableData(nans);
          setDescColumns(descColumns);
          setDescTableData(desc);

          setShape(result.shape);
          setDuplicates(result.duplicates);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleGroupBy = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/group_by", {
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
        setGroupedColumns(columns);
        setGroupedTableData(data);
      }
    } catch (err) {
      console.error("Failed grouping dataset: ", err);
    }
  };

  return (
    <div className="home-page-container">
      <header>
        <img src="pandas-icon.png" alt="" />
        <h1>Pandas UI</h1>
      </header>
      <div>
        <div className="data-loading">
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload CSV
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />
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
          {tableData[0] && (
            <div>
              <Button className="refresh-button" variant="outlined">
                Refresh
              </Button>
              {duplicates > 0 && <Button className="refresh-button" variant="outlined">
                Drop duplicates
              </Button>}
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
            {nansTableData.length > 0 && (
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

              <Button onClick={handleGroupBy} variant="outlined">
                Group By
              </Button>
            </>
          )}
        </div>
        <div className="reading-data-inputs grouped">
          {groupedTableData.length > 0 && (
            <MaterialTable
              title={`Grouped By -- ${aggregationFunction.toUpperCase(aggregationFunction)}`}
              columns={groupedColumns}
              data={groupedTableData}
              options={{
                search: true,
                sorting: false,
                exportButton: true
              }}
            />
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
      <footer></footer>
    </div>
  );
};

export default HomePage;
