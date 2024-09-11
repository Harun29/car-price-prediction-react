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

import CarCard from "../Components/CarCard";
import CarDetails from "../Components/CarDetails";
import { motion } from "framer-motion";
import { usePandas } from "../Context/PandasContext";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@emotion/react";

const HomePage = () => {
  const theme = useTheme();
  const [prediction, setPrediction] = useState(false);
  const [alignment, setAlignment] = useState("Front");
  const [detailedDescription, setDetailedDescription] = useState(false);
  const [carType, setCarType] = useState("default-car.png");
  const [selectedLogo, setSelectedLogo] = useState("vw");
  const [predictionValue, setPredictionValue] = useState("");
  const [range, setRange] = useState();
  const [predictedVehicles, setPredictedVehicles] = useState([]);
  const { getPrediction } = usePandas();
  const [loading, setLoading] = useState(false);
  const [carsLoading, setCarsLoading] = useState(false);

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

  const [tempValue, setTempValue] = useState(year);

  const [modelSelection, setModelSelection] = useState();
  const [models, setModels] = useState([]);
  const [oldModels, setOldModels] = useState([]);
  const [score, setScore] = useState();
 
  const handleYearChange = (e, newValue) => {
    setCarsLoading(true);
    setTempValue(newValue); // Update tempValue while sliding
  };

  const handleChangeCommitted = (e, newValue) => {
    setYear(newValue);
  };

  const handlePrediction = async (event) => {
    event && event.preventDefault();
    const data = {
      type: carCategory,
      drivetrain,
      fuel: fuelType,
      doors,
      transmission,
      displacement: parseFloat(displacement),
      kilowatts: parseFloat(kilowatts),
      mileage: parseFloat(mileage),
      year: parseFloat(year),
      cruisecontrol: cruiseControl ? 1 : 0,
      aircondition: airCondition ? 1 : 0,
      navigation: navigation ? 1 : 0,
      registration: registration ? 1 : 0,
      parkingsensors: parkingSensors,
    };

    console.log(data);

    setLoading(true);
    setCarsLoading(true);
    try {
      const response = await getPrediction(data);
      setPredictionValue(response.prediction);
      setPredictedVehicles(response.vehicles);
      setRange(response.score);
      setLoading(false);
      setCarsLoading(false);
      setPrediction(true);
      setScore(response.model_metrics.RMSE)
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const changeCarModel = async (model) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/select_brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand: model }),
      });

      if (!response.ok) {
        throw new Error("Failed to change brand");
      } else {
        return "successful";
      }
    } catch (err) {
      console.error("Error in changing car model: ", err);
    }
  };

  const changeToAudi = async () => {
    await changeCarModel("audi");
    setCarType("audi-car.png");
    setSelectedLogo("audi");
  };

  const changeToVw = async () => {
    await changeCarModel("volkswagen");
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
  }, [
    year,
    parkingSensors,
    kilowatts,
    mileage,
    cruiseControl,
    airCondition,
    navigation,
    registration,
    carCategory,
    displacement,
    fuelType,
    transmission,
    doors,
    drivetrain,
    mileage,
    carType,
    modelSelection,
  ]);

  const handleDisplacementChange = (e) => {
    let value = e.target.value;

    // Remove any non-numeric characters, except for the decimal point
    value = value.replace(/[^0-9.]/g, "");

    // Split the string on the decimal point to separate the integer and decimal parts
    const parts = value.split(".");

    // Keep only the first decimal point and allow only one decimal place
    if (parts.length > 2) {
      value = `${parts[0]}.${parts[1]}`;
    } else if (parts[1] && parts[1].length > 1) {
      value = `${parts[0]}.${parts[1].substring(0, 1)}`;
    }

    setDisplacement(value);
  };

  const getModels = async (modelType) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_models?model_type=${modelType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const models = await response.json();
      modelType === "old"
        ? setOldModels(models.models)
        : setModels(models.models);
    } catch (err) {
      console.error("error loading models: ", err);
    }
  };

  useEffect(() => {
    try {
      getModels("old");
      getModels("new");
      selectedLogo === "vw" 
        ? changeCarModel('volkswagen') 
        : changeCarModel('audi')
    } catch (Err) {
      console.error(Err);
    }
  }, [selectedLogo]);

  useEffect(() => {
    try {
      selectedLogo === "vw" 
        ? changeCarModel('volkswagen') 
        : changeCarModel('audi')
    } catch (Err) {
      console.error(Err);
    }
  }, []);

  const selectModel = async (model, type) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/set_selected_model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model_name: model, model_type: type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const data = await response.json();
      console.log("Model set successfully:", data);
    } catch (err) {
      console.error("Error changing model: ", err);
    }
  };

  useEffect(() => {
    models && console.log(models);
  }, [models]);

  const formatModelName = (model) => {
    const parts = model.split("_");
  
    const modelName = parts
      .slice(0, -2)
      .filter(word => word.toLowerCase() !== 'model')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
    const rawDate = parts[parts.length - 2];
    const year = rawDate.slice(0, 4);
    const month = rawDate.slice(4, 6);
    const day = rawDate.slice(6, 8);
    const formattedDate = `${day}. ${month}. ${year}.`;
  
    return `${modelName} (${formattedDate})`;
  };
  

  return (
    <div className={`home-page-container ${prediction && "active"}`}>
      <form onSubmit={handlePrediction} className="car-specs">
        <h3 className={`heading3 ${prediction && "active"}`}>
          Find Your Perfect Car Match
          {/* <FormControl className="home-page-input model-selection">
            <InputLabel id="data-label">Data</InputLabel>
            <Select
              labelId="data-label"
              id="data"
              value={dataSelection}
              label="Data"
              onChange={(e) => setDataSelection(e.target.value)}
            >
              <MenuItem value="XGBoost(old)">Data updated on: 17. 07. 24.</MenuItem>
              <MenuItem value="XGBoost(old)">Data updated on: 09. 09. 24.</MenuItem>
            </Select>
          </FormControl> */}
          <FormControl
            variant="standard"
            className="home-page-input model-selection"
          >
            <InputLabel id="ml-model-label">Model</InputLabel>
            <Select
              labelId="ml-model"
              id="ml-model"
              value={modelSelection}
              label="Model"
              onChange={(e) => {
                const selectedModel = e.target.value;
                setModelSelection(selectedModel);
                const type = oldModels.includes(selectedModel) ? "old" : "new";
                selectModel(selectedModel, type);
              }}
            >
              <span
                style={{
                  color: theme.palette.text.secondary,
                  marginLeft: 15,
                  fontSize: 14,
                }}
              >
                Latest models
              </span>
              {models.map((model) => {
                const formattedModel = formatModelName(model);
                return (
                  <MenuItem value={model} key={model}>
                    {formattedModel}
                  </MenuItem>
                );
              })}

              {oldModels.length > 0 && (
                <span
                  style={{
                    color: theme.palette.text.secondary,
                    marginLeft: 15,
                    fontSize: 14,
                  }}
                >
                  Old models
                </span>
              )}
              {oldModels.map((model) => {
                const formattedModel = formatModelName(model);
                return (
                  <MenuItem value={model} key={model}>
                    {formattedModel}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </h3>
        <p className="home-page-paragraph">
          Use our advanced car prediction tool to find vehicles that meet your
          specific needs. Simply enter your preferences, and we'll match you
          with the best options available.
        </p>
        <div className="row-inputs">
          <FormControl fullWidth>
            <FormControl fullWidth>
              <TextField
                id="displacement-input"
                value={displacement}
                onChange={handleDisplacementChange}
                label="Displacement"
              />
            </FormControl>
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
            <InputLabel className="home-page-input" id="transmission-label">
              Transmission
            </InputLabel>
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
          <FormControl className="home-page-input" fullWidth>
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
              required
              labelId="type-label"
              id="type"
              value={carCategory}
              label="Type"
              onChange={(e) => setCarCategory(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="Caravan">Caravan</MenuItem>
              <MenuItem value="Sports/Coupe">Sports/Coupe</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Monovolume">Monovolume</MenuItem>
              <MenuItem value="Small car">Small car</MenuItem>
              <MenuItem value="Caddy">Caddy</MenuItem>
              <MenuItem value="Van">Van</MenuItem>
              <MenuItem value="Pick-up">Pick-up</MenuItem>
              <MenuItem value="Off-Road">Off-Road</MenuItem>
              <MenuItem value="Convertible">Convertible</MenuItem>
              <MenuItem value="Oldtimer">Oldtimer</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="home-page-input" fullWidth>
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
            value={tempValue}
            onChange={handleYearChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="auto"
            step={1}
            marks={false}
            min={1950}
            max={2024}
          />
        </div>
        <Button type="submit" variant="outlined" className="find-cars-button">
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
            <span>{Math.round(predictionValue, 0)} KM</span>
            <div className="prediction-range">
              <div>
                <ArrowDropUpIcon />
                <ArrowDropDownIcon />
              </div>
              <span style={{ color: theme.palette.text.secondary }}>
                {Math.round(score, 0)} KM
              </span>
            </div>
          </div>
        )}
      </form>
      <div className={`home-page-right-side ${prediction && "active"}`}>
        {prediction && (
          <div className="cars-container">
            {!detailedDescription && !carsLoading && !loading && (
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
            {detailedDescription && !carsLoading && !loading && (
              <CarDetails
                data={vehicleData}
                carImage={carImg}
                closeDetailedDescription={closeDetailedDescription}
              />
            )}
            {carsLoading && (
              <div className="car-predictions-loading">
                <span>Loading Cars...</span>
                <CircularProgress />
              </div>
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
