import React from "react";
import { ResponsiveLine } from "@nivo/line";
import useNivoTheme from "../../NivoTheme";
import { useState, useEffect } from "react";

const PriceDistributionLineChart = () => {
  const nivoTheme = useNivoTheme();


  const [data, setData] = useState()

  const getData = async () => {
    const url = "http://127.0.0.1:5000/get_line_plot_data";
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
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    data && console.log("aaaaa: ",data)
  }, [data])

  return (data &&
    <div style={{ height: "90%", width: "100%" }}>
      <ResponsiveLine
        data={data}
        theme={nivoTheme}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        curve="monotoneX"
        colors={{ scheme: "nivo" }}
        lineWidth={2}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-12}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Model",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Price",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.75,
            symbolSize: 12,
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
        ariaLabel="Line chart showing price distribution"
      />
    </div>
  );
};

export default PriceDistributionLineChart;
