import { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import Papa from 'papaparse';
import MaterialTable from '@material-table/core';
import '../Style/HomePage.css';

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  
  const [nansTableData, setNansTableData] = useState([]);
  const [nansColumns, setNansColumns] = useState([]);

  const [shape, setShape] = useState();

  useEffect(() => {
    tableData && console.log("main table: ", tableData)
    nansTableData && console.log("nans table: ", nansTableData)
    columns && console.log("columns: ", columns)
    nansColumns && console.log("nans columns: ", nansColumns)
  }, [tableData, nansTableData, nansColumns, columns])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://127.0.0.1:5000/upload_csv', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const result = await response.json();
        const data = result.data;

        if (data.length > 0) {
          const keys = Object.keys(data[0]);
          const columns = keys.map(key => ({ title: key, field: key }));

          setColumns(columns);
          setTableData(data);

          setShape(result.shape);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const getNans = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_nans', {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch NaNs: ' + response.statusText);
      }
  
      const result = await response.json();
      const data = result.nans;
  
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        const columns = keys.map(key => ({ title: key, field: key }));

        setNansColumns(columns);
        setNansTableData(data);
      }
    } catch (error) {
      console.error('Error fetching NaNs:', error);
    }
  };
  
  return (
    <div className="home-page-container">
      <header>
        <img src="pandas-icon.png" alt="" />
        <h1>Pandas UI</h1>
      </header>
      <div>
        <div className='data-loading'>
          <label htmlFor="file-upload" className="custom-file-upload">
            Upload CSV
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />
        </div>

        <div className="reading-data-inputs">
          {tableData.length > 0 && (
            <MaterialTable
              title={`CSV Data -- Shape: ${shape}`}
              columns={columns}
              data={tableData}
              options={{
                search: true,
                paging: true,
                exportButton: true,
              }}
            />
          )}
        </div>
        <div className="controll-buttons">
          {tableData[0] && <Button className="refresh-button" variant='outlined'>Refresh</Button>}
          {tableData[0] && <Button onClick={getNans} className="refresh-button" variant='outlined'>Get NaNs</Button>}
        </div>
        <div className="reading-data-inputs nans">
          {nansTableData.length > 0 && (
            <MaterialTable
              title={`NaN Values`}
              columns={nansColumns}
              data={nansTableData}
              options={{
                search: true
              }}
            />
          )}
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default HomePage;



