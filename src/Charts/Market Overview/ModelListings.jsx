import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import useNivoTheme from "../../NivoTheme";
import { useTheme } from "@emotion/react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";

const ModelListingsChart = () => {
  const [modelData, setModelData] = useState({
    modelToType: {},
    modelCounts: {},
    data: [],
  });
  const [aiDescription, setAiDescription] = useState(
    "Getting Jarvis' description...",
  );
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async () => {
    const { data } = modelData;
    if (!data.length) return;

    const dataString = data
      .map(
        (series) =>
          `${series.type}: ` +
          Object.entries(series)
            .filter(([key]) => key !== "type")
            .map(([model, count]) => `${model} at ${count}`)
            .join(", "),
      )
      .join("; ");

    const message = `You are an AI assistant analyzing a bar chart that compares car models across different types. The chart shows the following data: ${dataString}. Describe any notable trends, and discuss significant differences between the models in 150 words.`;

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
      console.error("Error fetching AI description:", err);
    }
  };

  useEffect(() => {
    if (
      descriptionVisible &&
      aiDescription === "Getting Jarvis' description..."
    ) {
      handleSendMessage();
    }
  }, [descriptionVisible]);

  const handleDescriptionToggle = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  const fetchData = async () => {
    const url = "http://127.0.0.1:5000/model_listings";
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
      const { model_to_type, modelCounts } = result;

      const carTypeData = Object.entries(model_to_type).reduce(
        (acc, [model, type]) => {
          if (!acc[type]) {
            acc[type] = { type };
          }
          acc[type][model] = modelCounts[model] || 0;
          return acc;
        },
        {},
      );

      const modelListingsData = Object.values(carTypeData);
      setModelData({
        modelToType: model_to_type,
        modelCounts,
        data: modelListingsData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const theme = useTheme();
  const nivoTheme = useNivoTheme();

  const { data, modelCounts } = modelData;

  return (
    data.length > 0 && (
      <div className="plot-holder" style={{ height: "90%", width: "100%" }}>
        {!descriptionVisible && (
          <AutoAwesomeIcon
            className="get-prediction"
            onClick={handleDescriptionToggle}
          />
        )}
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
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendPosition: "middle",
            legendOffset: -40,
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
        {descriptionVisible && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleDescriptionToggle}
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

export default ModelListingsChart;
