import { useState } from "react";
import { Button } from "@mui/material";
import MaterialTable from '@material-table/core';
import '../Style/HomePage.css';

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  
  const [nansTableData, setNansTableData] = useState([]);
  const [nansColumns, setNansColumns] = useState([]);

  const [descTableData, setDescTableData] = useState([]);
  const [descColumns, setDescColumns] = useState([]);

  const [shape, setShape] = useState();
  const [duplicates, setDuplicates] = useState();

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
            const nans = result.nans;
            const desc = result.description;

            if (data.length > 0) {

                const columns = Object.keys(data[0]).map(key => ({ title: key, field: key }));
                const nanColumns = Object.keys(nans[0]).map(key => ({ title: key, field: key }));
                const descColumns = Object.keys(desc[0]).map(key => ({ title: key, field: key }));

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
            console.error('Error uploading file:', error);
        }
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
              title={`CSV Data -- Shape: ${shape} -- Duplicates: ${duplicates}`}
              columns={columns}
              data={tableData}
              options={{
                search: true,
                paging: true,
                exportButton: true,
                sorting: false
              }}
            />
          )}
        </div>
        <div className="controll-buttons">
          {tableData[0] && <Button className="refresh-button" variant='outlined'>Refresh</Button>}
        </div>
        <div className="main-info-container">
          <div className="reading-data-inputs">
            {nansTableData.length > 0 && (
              <MaterialTable
                title={`NaN Values`}
                columns={nansColumns}
                data={nansTableData}
                options={{
                  search: true,
                  sorting: false
                }}
              />
            )}
          </div>
          <div className="reading-data-inputs desc">
            {nansTableData.length > 0 && (
              <MaterialTable
                title={`Description`}
                columns={descColumns}
                data={descTableData}
                options={{
                  search: true,
                  sorting: false
                }}
              />
            )}
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default HomePage;
