import { ResponsiveBar } from '@nivo/bar';
import useNivoTheme from '../../NivoTheme';
import { useState, useEffect } from 'react';

const PriceRangeHorizontalBarChart = () => {
  // const data = [
  //   { priceRange: 'Category 1', minPrice: 1000, maxPrice: 5000 },
  //   { priceRange: 'Category 2', minPrice: 2000, maxPrice: 6000 },
  //   { priceRange: 'Category 3', minPrice: 3000, maxPrice: 7000 },
  //   { priceRange: 'Category 4', minPrice: 1500, maxPrice: 5500 },
  //   { priceRange: 'Category 5', minPrice: 2500, maxPrice: 6500 },
  //   { priceRange: 'Category 6', minPrice: 1200, maxPrice: 4500 },
  //   { priceRange: 'Category 7', minPrice: 1500, maxPrice: 8000 },
  //   { priceRange: 'Category 8', minPrice: 3500, maxPrice: 7500 },
  //   { priceRange: 'Category 9', minPrice: 1000, maxPrice: 3500 },
  //   { priceRange: 'Category 10', minPrice: 3500, maxPrice: 7500 },
  // ];

  const [data, setData] = useState()

  const getData = async () => {
    const url = "http://127.0.0.1:5000/type_minmax_price";
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
    data && console.log("bbbbb:", data)
  }, [data])

  const nivoTheme = useNivoTheme()

  return (data &&
    <div style={{ width: '100%', height: '90%' }}>
      <ResponsiveBar
        data={data}
        theme={nivoTheme}
        keys={['minPrice', 'maxPrice']}
        indexBy="priceRange"
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        padding={0.2}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price Range',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price',
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

export default PriceRangeHorizontalBarChart;
