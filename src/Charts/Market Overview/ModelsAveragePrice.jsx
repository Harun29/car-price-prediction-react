import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import useNivoTheme from "../../NivoTheme";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";

const AveragePriceHistogram = () => {
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

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  const handleSendMessage = async () => {
    if (!data) return;

    const dataString = data
      .map((item) => `${item.model} at ${item.price}`)
      .join(", ");

    const message = `You are an AI assistant analyzing a bar chart that compares car models by their prices. The chart shows the following data: ${dataString}. Describe the price distribution across these models, identify any notable trends or outliers, and provide insights on the relative pricing of the models. Make it a maximum of 150 words!`;

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
    const url = "http://127.0.0.1:5000/models_average_price";
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

  const nivoTheme = useNivoTheme();

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
          keys={["price"]}
          indexBy="model"
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          layout="horizontal"
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
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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

export default AveragePriceHistogram;
