import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const DataCard = ({ title, value, color }) => {
  const theme = useTheme();
  const [aiDescription, setAiDescription] = useState(
    "Getting Jarvis' description..."
  );
  const [description, setDescription] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSendMessage = async () => {
    if (!value || !title) return;

    const message = `You are an AI assistant analyzing ${title} value of dataset of used cars. Value is ${value}. Explain what ${title} means and what it means for this data set. In maximum of 25 words!`;

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

  const HistogramContainer = styled("div")(({ theme }) => ({
    boxShadow:
      theme.palette.mode === "light"
        ? "9px 9px 18px #bcbcbc, -9px -9px 18px #ffffff"
        : "4px 4px 12px #000000, -4px -4px 12px #000000",
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  }));
  return (
    <HistogramContainer className="small-card">
      {!description && <AutoAwesomeIcon
          className="get-prediction data-card"
          onClick={(e) => handlePrediction(e)}
        />}
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
      {description && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleDescription}
          className="plot-description data-card"
          style={{backgroundColor: theme.palette.background.paper}}
        >
          <h3>Jarvis' description:</h3>
          <p>{aiDescription}</p>
        </motion.div>
      )}
    </HistogramContainer>

  );
};

export default DataCard;
