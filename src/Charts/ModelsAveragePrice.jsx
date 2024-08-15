import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import useNivoTheme from '../NivoTheme';

const AveragePriceHistogram = () => {
  const data = [
    { model: 'Arteon', averagePrice: 35000 },
    { model: 'Passat', averagePrice: 28000 },
    { model: 'Golf', averagePrice: 22000 },
    { model: 'Scirocco', averagePrice: 29000 },
    { model: 'Tiguan', averagePrice: 33000 },
    { model: 'Polo', averagePrice: 18000 },
    { model: 'Golf Variant', averagePrice: 26000 },
    { model: 'Sharan', averagePrice: 35000 },
    { model: 'Bora', averagePrice: 27000 },
    { model: 'Caddy', averagePrice: 30000 },
    { model: 'T4', averagePrice: 22000 },
    { model: 'Golf Plus', averagePrice: 25000 },
    { model: 'Touran', averagePrice: 32000 },
    { model: 'CC', averagePrice: 35000 },
    { model: 'Jetta', averagePrice: 29000 },
    { model: 'Amarok', averagePrice: 40000 },
    { model: 'Golf Alltrack', averagePrice: 28000 },
    { model: 'T5', averagePrice: 33000 },
    { model: 'Touareg', averagePrice: 45000 },
    { model: 'T-Roc', averagePrice: 30000 },
    { model: 'T5 Caravelle', averagePrice: 34000 },
    { model: 'Golf Sportsvan', averagePrice: 26000 },
    { model: 'ID.4', averagePrice: 37000 },
    { model: 'ID.5', averagePrice: 38000 },
    { model: 'ID.3', averagePrice: 31000 }
  ];
  

  const nivoTheme = useNivoTheme();

  return (
    <div style={{ width: '100%', height: '90%' }}>
      <ResponsiveBar
        data={data}
        theme={nivoTheme}
        keys={['averagePrice']}
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
