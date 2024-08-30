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
  ToggleButton,
} from "@mui/material";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';


import CarCard from "../Components/CarCard";
import CarDetails from "../Components/CarDetails";
import { motion } from "framer-motion";
import { usePandas } from "../Context/PandasContext";
import CircularProgress from "@mui/material/CircularProgress";
import NumberInputBasic from "../Components/NumberInput";

const HomePage = () => {
  const [prediction, setPrediction] = useState(false);
  const [alignment, setAlignment] = useState("Front");
  const [detailedDescription, setDetailedDescription] = useState(false);
  const [carType, setCarType] = useState("default-car.png");
  const [selectedLogo, setSelectedLogo] = useState("vw");
  const [predictionValue, setPredictionValue] = useState("");
  const [predictedVehicles, setPredictedVehicles] = useState([]);
  const { getPrediction } = usePandas();
  const [loading, setLoading] = useState(false);

  const [displacement, setDisplacement] = useState("");
  const [kilowatts, setKilowatts] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [doors, setDoors] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [mileage, setMileage] = useState("");
  const [carCategory, setCarCategory] = useState("");
  const [cruiseControl, setCruiseControl] = useState(false);
  const [airCondition, setAirCondition] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [parkingSensors, setParkingSensors] = useState("");
  const [year, setYear] = useState(2010);

  const [vehicleData, setVehicleData] = useState([]);
  const [carImg, setCarImg] = useState("");

  const handlePrediction = async () => {
    const data = {
      type: carCategory,
      drivetrain,
      fuel: fuelType,
      doors,
      displacement: parseFloat(displacement),
      kilowatts: parseFloat(kilowatts),
      mileage: parseFloat(mileage),
      year: parseFloat(year),
      cruisecontrol: cruiseControl ? 1 : 0,
      aircondition: airCondition ? 1 : 0,
      navigation: navigation ? 1 : 0,
      registration: registration ? 1 : 0,
      parkingsensors: parkingSensors
    };

    console.log(data);

    setLoading(true);
    try {
      const response = await getPrediction(data);
      setPredictionValue(response.prediction);
      setPredictedVehicles(response.vehicles);
      setLoading(false);
      setPrediction(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };


  const changeToAudi = () => {
    setCarType("audi-car.png");
    setSelectedLogo("audi");
  };
  const changeToVw = () => {
    setCarType("default-car.png");
    setSelectedLogo("vw");
  };

  const handleDetailedDescription = (vehicle, carImage) => {
    setCarImg(carImage);
    setVehicleData(vehicle);
    setDetailedDescription(true);
  };

  const closeDetailedDescription = () => {
    setDetailedDescription(false);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    prediction && handlePrediction();
  }, [year, parkingSensors, kilowatts, mileage, cruiseControl, airCondition, navigation, registration, carCategory, displacement, fuelType, transmission, doors, drivetrain, mileage])

  // TODO add loading for useEffect above
  // TODO fix positioning of car logo when active

  const handleDisplacement = (value) => {
    setDisplacement(value)
  }

  useEffect(() => {
    console.log("displacement: ", displacement)
  }, [displacement])

  return (
    <div className={`home-page-container ${prediction && "active"}`}>
      <div className="car-specs">
        <h3 className={`heading3 ${prediction && "active"}`}>
          Find Your Perfect Car Match
        </h3>
        <p className="home-page-paragraph">
          Use our advanced car prediction tool to find vehicles that meet your
          specific needs. Simply enter your preferences, and we'll match you
          with the best options available.
        </p>
        <div className="row-inputs">
          <FormControl fullWidth>
            <NumberInputBasic value={displacement} setValue={handleDisplacement} />
            {/* <NumberInput /> */}
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="kilowatts-input"
              value={kilowatts}
              onChange={(e) => setKilowatts(e.target.value)}
              label="Kilowatts"
            />
          </FormControl>
        </div>
        <div className="row-inputs">
          <FormControl fullWidth>
            <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
            <Select
              labelId="fuel-type-label"
              id="fuel-type"
              value={fuelType}
              label="Fuel Type"
              onChange={(e) => setFuelType(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
              <MenuItem value="Electro">Electro</MenuItem>
              <MenuItem value="Gas">Gas</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="transmission-label">Transmission</InputLabel>
            <Select
              labelId="transmission-label"
              id="transmission"
              value={transmission}
              label="Transmission"
              onChange={(e) => setTransmission(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
              <MenuItem value="Automatic">Automatic</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row-inputs">
          <FormControl fullWidth>
            <InputLabel id="doors-label">Doors</InputLabel>
            <Select
              labelId="doors-label"
              id="doors"
              value={doors}
              label="Doors"
              onChange={(e) => setDoors(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="2/3">2/3</MenuItem>
              <MenuItem value="4/5">4/5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="drivetrain-label">Drivetrain</InputLabel>
            <Select
              labelId="drivetrain-label"
              id="drivetrain"
              value={drivetrain}
              label="Drivetrain"
              onChange={(e) => setDrivetrain(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="FWD">FWD</MenuItem>
              <MenuItem value="RWD">RWD</MenuItem>
              <MenuItem value="AWD">AWD</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={`row-inputs ${!prediction && "smaller"}`}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={carCategory}
              label="Type"
              onChange={(e) => setCarCategory(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            {/* <InputLabel id="mileage-label">Mileage</InputLabel> */}
            <TextField
              id="mileage-input"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              label="Mileage"
            />
          </FormControl>
        </div>
        <div className={`row-inputs ${!prediction && "smallest"}`}>
          <FormControlLabel
            control={
              <Checkbox
                checked={cruiseControl}
                onChange={(e) => setCruiseControl(e.target.checked)}
              />
            }
            label="Cruise Control"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={airCondition}
                onChange={(e) => setAirCondition(e.target.checked)}
              />
            }
            label="Air Condition"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={navigation}
                onChange={(e) => setNavigation(e.target.checked)}
              />
            }
            label="Navigation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={registration}
                onChange={(e) => setRegistration(e.target.checked)}
              />
            }
            label="Registered"
          />
        </div>
        <div className={`row-inputs ${!prediction && "smallest"} cols`}>
          <Typography gutterBottom>Parking Sensors</Typography>
          <ToggleButtonGroup
            color="primary"
            value={parkingSensors}
            exclusive
            onChange={(event, newAlignment) => setParkingSensors(newAlignment)}
            aria-label="Parking Sensors"
          >
            <ToggleButton value="Front">Front</ToggleButton>
            <ToggleButton value="Rear">Rear</ToggleButton>
            <ToggleButton value="Front and Rear">Front and Rear</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={`row-inputs ${!prediction && "smallest"} cols`}>
          <Typography gutterBottom>Year</Typography>
          <Slider
            aria-label="Year"
            value={year}
            onChange={(e, newValue) => setYear(newValue)}
            valueLabelDisplay="auto"
            step={1}
            marks={false}
            min={1950}
            max={2024}
          />
        </div>
        <Button
          variant="outlined"
          className="find-cars-button"
          onClick={handlePrediction}
        >
          Find cars
        </Button>
        {loading && (
          <div className="loading">
            Loading Car Price...
            <CircularProgress />
          </div>
        )}
        {!loading && prediction && (
          <div className="predicted-value">
            Such car would cost around:{" "}
            <span>{Math.round(predictionValue, 0)} BAM</span>
          </div>
        )}
      </div>
      <div className={`home-page-right-side ${prediction && "active"}`}>
        {prediction && (
          <div className="cars-container">
            {!detailedDescription && (
              <div className="cars-found-container">
                {predictedVehicles.map((vehicle) => (
                  <CarCard
                    key={vehicle.id}
                    data={vehicle}
                    handleDetailedDescription={handleDetailedDescription}
                  />
                ))}
              </div>
            )}
            {detailedDescription && (
              <CarDetails
                data={vehicleData}
                carImage={carImg}
                closeDetailedDescription={closeDetailedDescription}
              />
            )}
          </div>
        )}

        <motion.img
          className={`home-page-default-car ${prediction && "active"} ${
            carType === "audi-car.png" && "audi"
          }`}
          src={carType}
          alt=""
          key={carType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <img
        onClick={changeToVw}
        className={`home-page-vw-logo ${
          selectedLogo === "vw" && "selected-logo"
        } ${prediction && "prediction-active"}`}
        src="vw-logo.png"
        alt="VW Logo"
      />
      <img
        onClick={changeToAudi}
        className={`home-page-audi-logo ${
          selectedLogo === "audi" && "selected-logo"
        } ${prediction && "prediction-active"}`}
        src="audi-logo.png"
        alt="Audi Logo"
      />
    </div>
  );
};

export default HomePage;
