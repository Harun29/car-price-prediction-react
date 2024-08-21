import { createContext, useContext, useEffect, useState } from "react";

const PandasContext = createContext();

export function usePandas() {
  return useContext(PandasContext);
}

export function PandasProvider({ children }) {

  const getPrediction = async (data) => {
    const url = 'http://127.0.0.1:5000/get_XGBoost_prediction';
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Prediction:', result.prediction);
        console.log('Filtered Vehicles:', result.vehicles);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const value = {
    getPrediction
  };

  return (
    <PandasContext.Provider value={value}>
      {children}
    </PandasContext.Provider>
  );
}

export default PandasContext;
