import { ResponsiveBoxPlot } from '@nivo/boxplot';
import useNivoTheme from '../../NivoTheme';
import { useEffect, useState } from 'react';
import OpenAI from "openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";

const ModelsPriceBoxPlot = () => {  
  const nivoTheme = useNivoTheme();

  const [inputData, setInputData] = useState();
  const [data, setData] = useState();
  const [aiDescription, setAiDescription] = useState(
    "Getting Jarvis' description..."
  );
  const [description, setDescription] = useState(false);
  const theme = useTheme();

  useEffect(() => { 
    data && console.log("box plot: ", data)
  }, [data])

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    data && console.log(data)
  }, [data])

  const handleSendMessage = async () => {
    if (!data) return;
  
    const getQuartiles = (values) => {
      values.sort((a, b) => a - b);
      const q1 = values[Math.floor((values.length / 4))];
      const q3 = values[Math.floor((values.length * (3 / 4)))];
      const median = values[Math.floor(values.length / 2)];
      return { q1, median, q3 };
    };
  
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.group} - ${item.subgroup}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item.value);
      return acc;
    }, {});
  
    const dataString = Object.entries(groupedData)
      .map(([key, values]) => {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const { q1, median, q3 } = getQuartiles(values);
        return `${key}: Min ${min}, Q1 ${q1}, Median ${median}, Q3 ${q3}, Max ${max}`;
      })
      .join("; ");
  
    const message = `You are an AI assistant analyzing a box plot that compares car models by their prices. The plot shows the following data: ${dataString}. Describe the price distribution across these models, identify any notable trends or outliers, and provide insights on the relative pricing of the models. Make it a maximum of 150 words!`;
  
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
    const url = "http://127.0.0.1:5000/get_models_price_box";
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
      setInputData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(inputData){
      const boxData = transformData(inputData);
      setData(boxData);
    }
    
  }, [inputData])
  
  const transformData = (input) => {
    return input.flatMap(groupItem => {
      const { group } = groupItem;
      return groupItem.data.flatMap(dataItem => {
        const { key, value } = dataItem;
        return value.map((val, index) => ({
          group: group,
          subgroup: key,
          mu: 0,
          sd: 0,
          n: value.length,
          value: val
        }));
      });
    });
  };

  return (data &&
    <div className="plot-holder" style={{ height: "90%", width: "100%" }}>
      {!description && (
          <AutoAwesomeIcon
            className="get-prediction"
            onClick={(e) => handlePrediction(e)}
          />
        )}
      <ResponsiveBoxPlot
        data={data}
        theme={nivoTheme}
        margin={{ top: 60, right: 100, bottom: 60, left: 60 }}
        subGroupBy="subgroup"
        padding={0.05}
        enableGridX={true}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'price',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        medianWidth={2}
        medianColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        motionConfig="stiff"
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemWidth: 60,
                itemHeight: 20,
                itemsSpacing: 3,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                symbolSize: 20,
                symbolShape: 'square',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
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
  );
}

export default ModelsPriceBoxPlot;
