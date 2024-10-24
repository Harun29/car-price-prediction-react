import useNivoTheme from "../../NivoTheme";
import { useEffect, useState, useMemo, useCallback } from "react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart2 = () => {
  const nivoTheme = useNivoTheme();
  const [data, setData] = useState();
  const [aiDescription, setAiDescription] = useState(
    "Getting Jarvis' description...",
  );
  const [description, setDescription] = useState(false);
  const theme = useTheme();

  const openai = useMemo(
    () =>
      new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
    []
  );

  const handleSendMessage =useCallback( async () => {
    if (!data) return;

    const message = `You are an AI assistant analyzing a bar chart. The chart compares the average prices of the most popular car types by their production year. The data contains various car types and their average prices across different year ranges: ${JSON.stringify(data)}. Your task is to provide insights into the price trends over the years, highlight which types have seen price increases or decreases, and identify any notable patterns or outliers. Summarize your findings in 150 words, focusing on how the types compare and what can be inferred about the pricing dynamics.`;

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
  }, [data, openai]);

  useEffect(() => {
    if (description && aiDescription === "Getting Jarvis' description...") {
      handleSendMessage();
    }
  }, [description, aiDescription, handleSendMessage]);

  const handleDescription = () => {
    setDescription(false);
  };

  const handlePrediction = (e) => {
    e.stopPropagation();
    setDescription(true);
  };

  const getData = async () => {
    const url = "https://ml-flask-server-production.up.railway.app/get_top5types_barplot_data";
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

  return (
    data && (
      <div className="plot-holder" style={{ height: "90%", width: "100%" }}>
        {!description && (
          <AutoAwesomeIcon
            className="get-prediction"
            onClick={(e) => handlePrediction(e)}
          />
        )}
        <ResponsiveBar
          data={data}
          theme={nivoTheme}
          indexBy="year_range"
          keys={["Caravan", "Hatchback", "Monovolume", "SUV", "Sedan"]} // Specify the keys
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          groupMode="grouped"
          layout="horizontal"
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
            legend: "Average Price",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legendOffset: -40,
            tickRotation: -45,
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
            `${e.id}: ${e.formattedValue} in year range: ${e.indexValue}`
          }
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

export default BarChart2;
