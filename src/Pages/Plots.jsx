import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PlotsPage = () => {
  const [scatterPlot, setScatterPlot] = useState(null);
  const [countPlot, setCountPlot] = useState(null);
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState('');
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const fetchPlot = async (endpoint, setState, xColumn = null) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ x_column: xColumn })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch plot: ' + response.statusText);
      }
      const result = await response.json();
      setState(result.count_plot);
    } catch (error) {
      console.error('Error fetching plot:', error);
    }
  };

  // Fetch column names for the Select dropdown
  const fetchColumns = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_columns', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch columns: ' + response.statusText);
      }
      const result = await response.json();
      setColumns(result.columns);  // Ensure result.columns is an array of column names
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  useEffect(() => {
    if (showColumnSelector) {
      fetchColumns();
    }
  }, [showColumnSelector]);

  return (
    <div className="plots-page-container">
      <header>
        <h1>Plots Page</h1>
      </header>
      <div className="controll-buttons">
        {!showColumnSelector && (
          <Button className="refresh-button" variant="outlined" onClick={() => setShowColumnSelector(true)}>
            Count Plot
          </Button>
        )}
        {showColumnSelector && (
          <>
            <FormControl variant="outlined" style={{ minWidth: 200 }}>
              <InputLabel id="x-column-label">X Column</InputLabel>
              <Select
                labelId="x-column-label"
                id="x-column-select"
                value={xColumn}
                onChange={(e) => setXColumn(e.target.value)}
                label="X Column"
              >
                {columns.map(col => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button className="refresh-button" variant="outlined" onClick={() => fetchPlot('count_plot', setCountPlot, xColumn)}>Generate Count Plot</Button>
          </>
        )}
      </div>
      <div className="plot-container">
        {scatterPlot && <img src={`data:image/png;base64,${scatterPlot}`} alt="Scatter Plot" />}
        {countPlot && <img src={`data:image/png;base64,${countPlot}`} alt="Count Plot" />}
      </div>
    </div>
  );
};

export default PlotsPage;
