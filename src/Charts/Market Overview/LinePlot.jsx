import React from "react";
import { ResponsiveLine } from "@nivo/line";
import useNivoTheme from "../../NivoTheme";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";

const PriceDistributionLineChart = () => {
  const nivoTheme = useNivoTheme();
  const [data, setData] = useState();
  const [aiDescription, setAiDescription] = useState(
    "Getting Jarvis' description...",
  );
  const [description, setDescription] = useState(false);
  const theme = useTheme();

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async () => {
    if (!data) return;

    const dataString = data
      .map(
        (series) =>
          `${series.id}: ` +
          series.data.map((item) => `${item.x} at ${item.y}`).join(", "),
      )
      .join("; ");

    const message = `You are an AI assistant analyzing a line chart that compares car models across different price ranges. The chart shows the following data: ${dataString}. Describe how the prices of these models compare across the different series ("Price Range", "Median Price", "75% Price"), identify any notable trends, and discuss any significant differences between the models. Provide insights on the distribution of prices for each model. Make it a maximum of 100 words!`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });

      const aiMessage = completion.choices[0].message.content;
      setAiDescription(aiMessage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (description && aiDescription === "Getting Jarvis' description...") {
      handleSendMessage();
    }
  }, [description]);

  const handleDescription = () => {
    setDescription(false);
  };

  const handlePrediction = (e) => {
    e.stopPropagation();
    if (aiDescription === "Getting Jarvis' description...") {
      setDescription(true);
    } else {
      setDescription(true);
    }
  };

  const getData = async () => {
    const url = "http://127.0.0.1:5000/get_line_plot_data";
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
    getData();
  }, []);

  useEffect(() => {
    data && console.log("aaaaa: ", data);
  }, [data]);

  return (
    data && (
      <div className="plot-holder" style={{ height: "90%", width: "100%" }}>
        {!description && (
          <AutoAwesomeIcon
            className="get-prediction"
            onClick={(e) => handlePrediction(e)}
          />
        )}
        <ResponsiveLine
          data={data}
          theme={nivoTheme}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          curve="monotoneX"
          colors={{ scheme: "nivo" }}
          lineWidth={2}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enablePointLabel={true}
          pointLabel="y"
          pointLabelYOffset={-12}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Model",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Price",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.75,
              symbolSize: 12,
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
          ariaLabel="Line chart showing price distribution"
        />
        {description && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleDescription}
            className="plot-description"
            style={{ backgroundColor: theme.palette.background.paper }}
          >
            <h3>Jarvis' description:</h3>
            <p>{aiDescription}</p>
          </motion.div>
        )}
      </div>
    )
  );
};

export default PriceDistributionLineChart;
