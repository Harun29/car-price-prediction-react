import { ResponsiveBoxPlot } from '@nivo/boxplot';
import useNivoTheme from '../../NivoTheme';
import { useEffect, useState } from 'react';

const ModelsPriceBoxPlot = () => {  
  const nivoTheme = useNivoTheme();

  const [inputData, setInputData] = useState();
  const [data, setData] = useState();

  const getData = async () => {
    const url = "http://127.0.0.1:5000/get_models_price_box";
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
      setInputData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(inputData){
      const boxData = transformData(inputData);
      setData(boxData);
    }
    
  }, [inputData])
  
  const transformData = (input) => {
    return input.flatMap(groupItem => {
      const { group } = groupItem;
      return groupItem.data.flatMap(dataItem => {
        const { key, value } = dataItem;
        return value.map((val, index) => ({
          group: group,
          subgroup: key,
          mu: 0,
          sd: 0,
          n: value.length,
          value: val
        }));
      });
    });
  };

  return (data &&
    <div style={{ width: '100%', height: '90%' }}>
      <ResponsiveBoxPlot
        data={data}
        theme={nivoTheme}
        margin={{ top: 60, right: 100, bottom: 60, left: 60 }}
        subGroupBy="subgroup"
        padding={0.05}
        enableGridX={true}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        medianWidth={2}
        medianColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        motionConfig="stiff"
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemWidth: 60,
                itemHeight: 20,
                itemsSpacing: 3,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                symbolSize: 20,
                symbolShape: 'square',
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
}

export default ModelsPriceBoxPlot;
