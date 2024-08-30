import { createContext, useContext, useEffect, useState } from "react";

const MLContext = createContext();

export function useML() {
  return useContext(MLContext);
}

export function MLProvider({ children }) {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [nansTableData, setNansTableData] = useState([]);
  const [nansColumns, setNansColumns] = useState([]);

  const [descTableData, setDescTableData] = useState([]);
  const [descColumns, setDescColumns] = useState([]);

  const [shape, setShape] = useState();
  const [duplicates, setDuplicates] = useState();
  const [columnsList, setColumnsList] = useState([]);

  const [columnsAIResponse, setColumnsAIResponse] = useState("");

  // useEffect(() => {
  //   handleInitialData();
  // }, []);

  useEffect(() => {
    columnsList && console.log("columns: ", columnsList);
  }, [columnsList]);

  useEffect(() => {
    columnsAIResponse && console.log("ai response: ", columnsAIResponse);
  }, [columnsAIResponse]);

  // const handleInitialData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/get_csv", {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to get file");
  //     }

  //     const result = await response.json();
  //     const data = result.data;
  //     const nans = result.nans;
  //     const desc = result.description;
  //     const cols = result.columns;

  //     if (data.length > 0) {
  //       const columns = Object.keys(data[0]).map((key) => ({
  //         title: key,
  //         field: key,
  //       }));
  //       const nanColumns = Object.keys(nans[0]).map((key) => ({
  //         title: key,
  //         field: key,
  //       }));
  //       const descColumns = Object.keys(desc[0]).map((key) => ({
  //         title: key,
  //         field: key,
  //       }));

  //       setColumns(columns);
  //       setTableData(data);
  //       setNansColumns(nanColumns);
  //       setNansTableData(nans);
  //       setDescColumns(descColumns);
  //       setDescTableData(desc);
  //       setColumnsList(cols);

  //       setShape(result.shape);
  //       setDuplicates(result.duplicates);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  const value = {};

  return <MLContext.Provider value={value}>{children}</MLContext.Provider>;
}

export default MLContext;
