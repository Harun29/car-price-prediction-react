import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import useNivoTheme from "../NivoTheme"
import { useTheme } from "@emotion/react";

const model_to_type = {
  Arteon: "Limuzina",
  Passat: "Limuzina",
  Golf: "Hatchback",
  Scirocco: "Sportski/kupe",
  Tiguan: "SUV",
  Polo: "Hatchback",
  "Golf Variant": "Kombi",
  Sharan: "Monovolumen",
  Bora: "Limuzina",
  Caddy: "Kombi",
  T4: "Kombi",
  "Golf Plus": "Monovolumen",
  Touran: "Monovolumen",
  CC: "Limuzina",
  Jetta: "Limuzina",
  Amarok: "Pick-up",
  "Golf Alltrack": "Kombi",
  T5: "Kombi",
  Touareg: "SUV",
  "T-Roc": "SUV",
  "T5 Caravelle": "Kombi",
  "Golf Sportsvan": "Monovolumen",
  "ID.4": "SUV",
  "ID.5": "SUV",
  "ID.3": "Hatchback",
  "Buba / Beetle": "Hatchback",
  "T5 Multivan": "Kombi",
  "Passat Alltrack": "Kombi",
  "Passat Variant": "Kombi",
  "Golf GTE": "Hatchback",
  T6: "Kombi",
  "T7 Multivan": "Kombi",
  Vento: "Limuzina",
  LT: "Kombi",
  T2: "Kombi",
  "T4 Caravelle": "Kombi",
  Phaeton: "Limuzina",
  "Up!": "Hatchback",
  "Tiguan Allspace": "SUV",
  "T-Cross": "SUV",
  "e-Golf": "Hatchback",
  Fox: "Hatchback",
  Crafter: "Kombi",
  "T6 Caravelle": "Kombi",
  Eos: "Limuzina",
  "New Beetle": "Hatchback",
  Corrado: "Sportski/kupe",
  "Polo Cross": "SUV",
  T3: "Kombi",
  Taigo: "SUV",
  "T4 Multivan": "Kombi",
  Buggy: "Off-Road",
  Santana: "Off-Road",
  "T6 Multivan": "Kombi",
  "T3 Caravelle": "Kombi",
  "T3 Multivan": "Kombi",
  "Buba / Käfer / New Beetle": "Hatchback",
  181: "Off-Road",
  Routan: "Monovolumen",
  Atlas: "SUV",
  "Polo Plus": "Hatchback",
  "Polo Variant": "Kombi",
  "T6 Shuttle": "Kombi",
  "ID.7": "SUV",
  Iltis: "Off-Road",
  "ID.6": "SUV",
  XL1: "Limuzina",
  "T5 Shuttle": "Kombi",
  T1: "Kombi",
};

const modelCounts = {
  Arteon: 50,
  Passat: 70,
  Golf: 120,
  Scirocco: 30,
  Tiguan: 85,
  Polo: 150,
  "Golf Variant": 40,
  Sharan: 25,
  Bora: 35,
  Caddy: 45,
  T4: 15,
  "Golf Plus": 20,
  Touran: 22,
  CC: 28,
  Jetta: 60,
  Amarok: 18,
  "Golf Alltrack": 10,
  T5: 12,
  Touareg: 55,
  "T-Roc": 33,
  "T5 Caravelle": 8,
  "Golf Sportsvan": 14,
  "ID.4": 11,
  "ID.5": 9,
  "ID.3": 13,
  "Buba / Beetle": 16,
  "T5 Multivan": 7,
  "Passat Alltrack": 10,
  "Passat Variant": 40,
  "Golf GTE": 6,
  T6: 5,
  "T7 Multivan": 3,
  Vento: 18,
  LT: 12,
  T2: 4,
  "T4 Caravelle": 9,
  Phaeton: 20,
  "Up!": 22,
  "Tiguan Allspace": 13,
  "T-Cross": 27,
  "e-Golf": 8,
  Fox: 15,
  Crafter: 14,
  "T6 Caravelle": 7,
  Eos: 5,
  "New Beetle": 19,
  Corrado: 10,
  "Polo Cross": 4,
  T3: 6,
  Taigo: 13,
  "T4 Multivan": 7,
  Buggy: 2,
  Santana: 1,
  "T6 Multivan": 5,
  "T3 Caravelle": 4,
  "T3 Multivan": 3,
  "Buba / Käfer / New Beetle": 9,
  181: 1,
  Routan: 2,
  Atlas: 8,
  "Polo Plus": 10,
  "Polo Variant": 11,
  "T6 Shuttle": 4,
  "ID.7": 3,
  Iltis: 2,
  "ID.6": 4,
  XL1: 1,
  "T5 Shuttle": 3,
  T1: 1,
};

const carTypeData = Object.entries(model_to_type).reduce(
  (acc, [model, type]) => {
    if (!acc[type]) {
      acc[type] = { type };
    }
    acc[type][model] = modelCounts[model] || 0;
    return acc;
  },
  {}
);

const data = Object.values(carTypeData);

const ModelListingsChart = () => {
  const theme = useTheme()
  const nivoTheme = useNivoTheme();

  return (
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
