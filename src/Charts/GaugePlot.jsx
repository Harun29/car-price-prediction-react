import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function ArcDesign() {
  return (
    <Gauge
      value={75}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
}
