import "../Style/HomePage.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Typography,
  FormControlLabel,
  Checkbox,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";

import CarCard from "../Components/CarCard";
import CarDetails from "../Components/CarDetails";
import { motion } from "framer-motion";

const HomePage = () => {
  const [prediction, setPrediction] = useState(false);
  const [alignment, setAlignment] = useState('Front');
  const [detailedDescription, setDetailedDescription] = useState(false);
  const [carType, setCarType] = useState("default-car.png")
  const [selectedLogo, setSelectedLogo] = useState("vw");

  const changeToAudi = () =>{
    setCarType("audi-car.png")
    setSelectedLogo("audi");
  }
  const changeToVw = () =>{
    setCarType("default-car.png")
    setSelectedLogo("vw");
  }

  const handleDetailedDescription = () => {
    setDetailedDescription(true);
  }

  const closeDetailedDescription = () => {
    setDetailedDescription(false);
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handlePrediction = () => {
    setPrediction(!prediction);
  };

  return (
    <div className={`home-page-container ${prediction && "active"}`}>
      <div className="car-specs">
        <h3 className={`heading3 ${prediction && "active"}`}>Lorem ipsum dolor sit amet</h3>
        <p>
          Ut mattis rutrum nisl et euismod. Nam tincidunt risus id viverra
          porttitor.
        </p>
        <div className="row-inputs">
          <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">
              Displacement
            </InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Displacement"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">1.6</MenuItem>
              <MenuItem value="sum">1.9</MenuItem>
              <MenuItem value="count">2.0</MenuItem>
              <MenuItem value="max">3.0</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="fillna-label">Kilowatts</InputLabel>
            <TextField
              id="fillna-input"
              // value={fillValue}
              // onChange={handleFillValueChange}
              label="Kilowatts"
            />
          </FormControl>
        </div>
        <div className="row-inputs">
          <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">Fuel Type</InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Fuel Type"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">Diesel</MenuItem>
              <MenuItem value="sum">Petrol</MenuItem>
              <MenuItem value="sum">Hybrid</MenuItem>
              <MenuItem value="sum">Electro</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">
              Transmission
            </InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Transmission"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">Manual</MenuItem>
              <MenuItem value="sum">Automatic</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row-inputs">
          <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">Doors</InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Doors"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">2/3</MenuItem>
              <MenuItem value="sum">4/5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">Drivetrain</InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Drivetrain"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">FWD</MenuItem>
              <MenuItem value="sum">RWD</MenuItem>
              <MenuItem value="sum">AWD</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={`row-inputs ${!prediction && 'smaller'}`}>
        <FormControl fullWidth>
            <InputLabel id="aggregation-function-label">Type</InputLabel>
            <Select
              labelId="aggregation-function-label"
              id="aggregation-function"
              // value={aggregationFunction}
              label="Drivetrain"
              // onChange={handleAggregationFunctionChange}
            >
              <MenuItem value="mean">Any</MenuItem>
              <MenuItem value="mean">SUV</MenuItem>
              <MenuItem value="sum">Hatchback</MenuItem>
              <MenuItem value="sum">Sedan</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="fillna-label">Milage</InputLabel>
            <TextField
              id="fillna-input"
              // value={fillValue}
              // onChange={handleFillValueChange}
              label="Milage"
            />
          </FormControl>
        </div>
        <div className={`row-inputs ${!prediction && "smaller"}`}>
          <FormControlLabel control={<Checkbox />} label="Cruise Control" />
          <FormControlLabel control={<Checkbox />} label="Air Condition" />
          <FormControlLabel control={<Checkbox />} label="Navigation" />
          <FormControlLabel control={<Checkbox />} label="Registered" />
        </div>
        <div className={`row-inputs ${!prediction && 'smallest'} cols`}>
        <Typography gutterBottom>Parking Sensors</Typography>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="web">Front</ToggleButton>
            <ToggleButton value="android">Rear</ToggleButton>
            <ToggleButton value="ios">Front and Rear</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={`row-inputs ${!prediction && 'smallest'} cols`}>
          <Typography gutterBottom>Year</Typography>
          <Slider
            aria-label="Year"
            defaultValue={30}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={1}
            marks={false}
            min={1950}
            max={2024}
          />
        </div>
        <Button onClick={handlePrediction}>Find cars</Button>
      </div>
      <div className={`home-page-right-side ${prediction && "active"}`}>
        {prediction && 
        <div className="cars-container">
          {!detailedDescription && <div className="cars-found-container">
            <CarCard handleDetailedDescription={handleDetailedDescription}/>
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
          </div>}
          {detailedDescription && <CarDetails closeDetailedDescription={closeDetailedDescription}/>}
        </div>
        }
        <motion.img
          className={`home-page-default-car ${prediction && "active"} ${carType === "audi-car.png" && "audi"}`}
          src={carType}
          alt=""
          key={carType} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0}}
          transition={{ duration: 0.5 }}
          />
      </div>
      <img 
        onClick={changeToVw} 
        className={`home-page-vw-logo ${selectedLogo === "vw" && "selected-logo"} ${prediction && "prediction-active"}`} 
        src="vw-logo.png" 
        alt="VW Logo"
      />
      <img 
        onClick={changeToAudi} 
        className={`home-page-audi-logo ${selectedLogo === "audi" && "selected-logo"} ${prediction && "prediction-active"}`} 
        src="audi-logo.png" 
        alt="Audi Logo"
      />
    </div>
  );
};

export default HomePage;
