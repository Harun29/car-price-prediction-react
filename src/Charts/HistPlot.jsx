import { ResponsiveBar } from '@nivo/bar';
import useNivoTheme from '../NivoTheme';

const MyHistogram = () => {
  const data = [
    { priceRange: '$0-$100', count: 20 },
    { priceRange: '$100-$200', count: 35 },
    { priceRange: '$200-$300', count: 40 },
    { priceRange: '$300-$400', count: 40 },
    { priceRange: '$400-$500', count: 40 }
  ];

  const nivoTheme=useNivoTheme()

  return (
    <div style={{ width: '100%', height: '80%' }}>
      <ResponsiveBar
        data={data}
        theme={nivoTheme}
        keys={['count']}
        indexBy="priceRange"
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }} /* Minimal margin */
        padding={0.2} /* Adjust padding if necessary */
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
          legend: 'Count',
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

export default MyHistogram;
