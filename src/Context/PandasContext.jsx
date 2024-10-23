import { createContext, useContext, useEffect, useState } from "react";

const PandasContext = createContext();

export function usePandas() {
  return useContext(PandasContext);
}

export function PandasProvider({ children }) {
  const getPrediction = async (data) => {
    const url = "https://ml-flask-server-production.up.railway.app/get_prediction";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("predition result: ", result)
      // console.log("Prediction:", result.prediction);
      // console.log("Filtered Vehicles:", result.vehicles);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const value = {
    getPrediction,
  };

  return (
    <PandasContext.Provider value={value}>{children}</PandasContext.Provider>
  );
}

export default PandasContext;
