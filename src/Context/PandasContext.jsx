import { createContext, useContext, useEffect, useState } from "react";

const PandasContext = createContext();

export function usePandas() {
  return useContext(PandasContext);
}

export function PandasProvider({ children }) {
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

  useEffect(() => {
    try{
      handleInitialData()
    }catch(err){
      console.error(err)
    }
  }, [])

  const handleInitialData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_csv", {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Failed to get file");
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
  };

  const handleDropNa = async (dropAxis, dropHow) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/dropna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ axis: dropAxis, how: dropHow }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to drop NaN values");
      }

      const result = await response.json();
      const data = result.data;

      if (data.length > 0) {
        const columns = Object.keys(data[0]).map((key) => ({
          title: key,
          field: key,
        }));
        setColumns(columns);
        setTableData(data);
      }
    } catch (err) {
      console.error("Failed to drop NaN values: ", err);
    }
  };

  const handleFillNa = async (fillValue, fillMethod, fillColumn) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/fillna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fill_value: fillValue,
          method: fillMethod,
          column_name: fillColumn,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fill NaN values");
      }

      const result = await response.json();
      const data = result.data;

      if (data.length > 0) {
        const columns = Object.keys(data[0]).map((key) => ({
          title: key,
          field: key,
        }));
        setColumns(columns);
        setTableData(data);
      }
    } catch (err) {
      console.error("Failed to fill NaN values: ", err);
    }
  };

  const handleGroupBy = async (groupBy, valueColumn, aggregationFunction) => {
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

  const value = {
    handleDropNa,
    handleFillNa,
    handleGroupBy,
    handleFileUpload,
    tableData,
    columns,
    nansTableData,
    nansColumns,
    descTableData,
    descColumns,
    groupedTableData,
    groupedColumns,
    shape,
    duplicates,
  };

  return (
    <PandasContext.Provider value={value}>
      {children}
    </PandasContext.Provider>
  );
}

export default PandasContext;
