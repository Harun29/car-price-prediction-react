import { ResponsiveBar } from "@nivo/bar";
import useNivoTheme from "../../NivoTheme";
import { useState, useEffect, useCallback, useMemo } from "react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";

const MyHistogram = () => {
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

  const handleSendMessage = useCallback( async () => {
    if (!data) return;

    const dataString = data
      .map((item) => `${item.count}: ${item.priceRange}`)
      .join(", ");

    const message = `You are an AI assistant analyzing a bar chart of car price ranges. The bars represent the following data: ${dataString}. Describe which price ranges are most and least common, the percentage each range represents, and any notable patterns. Discuss the distribution in terms of price frequency and highlight any trends or insights suggested by the chart. Make it a maximum of 100 words!`;

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
    if (aiDescription === "Getting Jarvis' description...") {
      setDescription(true);
    } else {
      setDescription(true);
    }
  };

  const getData = async () => {
    const url = "https://ml-flask-server-production.up.railway.app/hist_plot";
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
      console.log("Prediction:", result.prediction);
      console.log("Filtered Vehicles:", result.vehicles);
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const nivoTheme = useNivoTheme();

  return (
    data && (
      <div className="plot-holder" style={{ width: "100%", height: "90%" }}>
        {!description && (
          <AutoAwesomeIcon
            className="get-prediction"
            onClick={(e) => handlePrediction(e)}
          />
        )}
        <ResponsiveBar
          data={data}
          theme={nivoTheme}
          keys={["count"]}
          indexBy="priceRange"
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          padding={0.2}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Price Range",
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
            format: (value) => `${value >= 1000 ? value / 1000 + 'k' : value}`,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
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

export default MyHistogram;
