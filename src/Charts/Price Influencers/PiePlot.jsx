import useNivoTheme from "../../NivoTheme";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { ResponsivePie } from "@nivo/pie";

const PiePlot = () => {
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

    const message = `You are an AI assistant analyzing a pie chart. The pie chart shows the following data representing average car prices for different models: ${JSON.stringify(
      data,
    )}. Summarize your findings in 150 words.`;

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
    const url = "http://127.0.0.1:5000/get_top5_models_avg_price_data";
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
    data && console.log("pie data: ", data);
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
        <ResponsivePie
          data={data}
          theme={nivoTheme}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={theme.palette.text.primary}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={theme.palette.text.primary}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: theme.palette.text.primary,
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: theme.palette.text.primary,
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 50,
              itemsSpacing: 0,
              itemWidth: 50,
              itemHeight: 18,
              itemTextColor: theme.palette.text.primary,
              itemDirection: "top-to-bottom",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
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

export default PiePlot;
