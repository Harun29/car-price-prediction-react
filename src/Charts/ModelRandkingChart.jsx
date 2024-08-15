import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import useNivoTheme from "../NivoTheme"
import { useTheme } from '@emotion/react';

const ModelRankingPieChart = () => {
  const data = [
    { id: 'Model A', value: 120 },
    { id: 'Model B', value: 90 },
    { id: 'Model C', value: 80 },
    { id: 'Model D', value: 70 },
    { id: 'Model E', value: 50 },
  ];
  const nivoTheme = useNivoTheme()
  
  return (

    <div style={{ height: '80%', width: '100%' }}>
      <ResponsivePie
        data={data}
        theme={nivoTheme}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 0,
                itemWidth: 50,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'top-to-bottom',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
      />
    </div>
  );
};

export default ModelRankingPieChart;
