import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import useNivoTheme from '../../NivoTheme';
import { useState, useEffect } from 'react';

const AveragePriceHistogram = () => {

  const [data, setData] = useState()

  const getData = async () => {
    const url = "http://127.0.0.1:5000/models_average_price";
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
  
  const nivoTheme = useNivoTheme();

  return (data &&
    <div style={{ width: '100%', height: '90%' }}>
      <ResponsiveBar
        data={data}
        theme={nivoTheme}
        keys={['price']}
        indexBy="model"
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        layout="horizontal"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Average Price',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default AveragePriceHistogram;
