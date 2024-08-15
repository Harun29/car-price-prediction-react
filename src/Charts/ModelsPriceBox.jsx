import { ResponsiveBoxPlot } from '@nivo/boxplot';
import useNivoTheme from '../NivoTheme';

const ModelsPriceBoxPlot = () => {  
  const nivoTheme = useNivoTheme();

  const inputData = [
    { group: 'Golf', data: [{ key: 'Hatch', value: [18000, 21000, 23000, 25000, 27000] }] },
    { group: 'Golf', data: [{ key: 'SUV', value: [19000, 22000, 24000, 26000, 28000] }] },
    { group: 'Passat', data: [{ key: 'Sedan', value: [24000, 26000, 28000, 30000, 32000] }] },
    { group: 'Tiguan', data: [{ key: 'SUV', value: [29000, 32000, 34000, 36000, 38000] }] },
    { group: 'Arteon', data: [{ key: 'Sedan', value: [32000, 34000, 36000, 38000, 40000] }] },
    { group: 'Polo', data: [{ key: 'Hatch', value: [17000, 19000, 21000, 23000, 25000] }] },
    { group: 'Jetta', data: [{ key: 'Sedan', value: [22000, 24000, 26000, 28000, 30000] }] },
    { group: 'ID.4', data: [{ key: 'SUV', value: [34000, 36000, 38000, 40000, 42000] }] },
    { group: 'ID.3', data: [{ key: 'Hatch', value: [31000, 33000, 35000, 37000, 39000] }] },
    { group: 'Taigo', data: [{ key: 'SUV', value: [28000, 30000, 32000, 34000, 36000] }] },
    { group: 'Beetle', data: [{ key: 'Sedan', value: [25000, 27000, 29000, 31000, 33000] }] }
  ];
  
  
  const transformData = (input) => {
    return input.flatMap(groupItem => {
      const { group } = groupItem;
      return groupItem.data.flatMap(dataItem => {
        const { key, value } = dataItem;
        return value.map((val, index) => ({
          group: group,
          subgroup: key,
          mu: 0, // mean
          sd: 0, // standard deviation
          n: value.length,
          value: val
        }));
      });
    });
  };
  
  const data = transformData(inputData);

  return (
    <div style={{ width: '100%', height: '90%' }}>
      <ResponsiveBoxPlot
        data={data}
        theme={nivoTheme}
        margin={{ top: 60, right: 100, bottom: 60, left: 60 }}
        subGroupBy="subgroup"
        // layout="horiznotal"
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
            legend: 'value',
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
