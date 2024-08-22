import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import useNivoTheme from "../../NivoTheme"
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";



const ModelListingsChart = () => {

  const [modelToType, setModelToType] = useState();
  const [modelCounts, setModelCounts] = useState();
  const [data, setData] = useState();

  const getData = async () => {
    const url = "http://127.0.0.1:5000/model_listings";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setModelToType(result.model_to_type);
      setModelCounts(result.modelCounts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData()
  }, [])
  
  useEffect(() => {
    if(modelToType && modelCounts){

      const carTypeData = Object.entries(modelToType).reduce(
        (acc, [model, type]) => {
          if (!acc[type]) {
            acc[type] = { type };
          }
          acc[type][model] = modelCounts[model] || 0;
          return acc;
        },
        {}
      );

      const modelListingsData = Object.values(carTypeData);
      setData(modelListingsData)
    }
  }, [modelToType, modelCounts])

  useEffect(() => {
    console.log("data: ", data)
  }, [data])

  const theme = useTheme()
  const nivoTheme = useNivoTheme();

  return (data &&
    <div style={{ height: "90%", width: "100%" }}>
      <ResponsiveBar
        data={data}
        theme={nivoTheme}
        keys={Object.keys(modelCounts)}
        indexBy="type"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Type",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={theme.palette.text.primary}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} in type: ${e.indexValue}`
        }
      />
    </div>
  );
};

export default ModelListingsChart;
