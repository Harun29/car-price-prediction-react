import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie2() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
          innerRadius: 20,
          outerRadius: 80,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 100,
          cy: 100,
        },
      ]}
    />
  );
}
