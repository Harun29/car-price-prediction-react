import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function CarDetails({ closeDetailedDescription }) {
  const carData = {
    type_encoded: "VW Tiguan",
    image: "tiguan2023.png",
    displacement: "Diesel",
    doors: 4,
    kilowatts: 150,
    mileage: 6000,
    year: 2023,
    cruiseControl: false,
    parkingSensors: true,
    transmission: "Automatic",
    airCondition: true,
    navigation: true,
    registration: "Registered",
    fuel_Benzin: false,
    fuel_Dizel: false,
    fuel_Elektro: true,
    fuel_Hibrid: false,
    fuel_Plin: false,
    pogon_Prednji: false,
    pogon_Sva: true,
    pogon_Zadnji: false,
    price: "75000 KM",
    description:
      "Ut vestibulum ipsum quam, ac blandit enim sodales ut. Phasellus ac auctor turpis. Morbi vel accumsan nisi, non consectetur libero. Sed facilisis risus id odio tempor finibus. Sed id tincidunt metus. Mauris non gravida elit. Suspendisse pretium pulvinar rhoncus. Nulla sit amet ornare arcu. Nullam posuere quam nec justo vulputate aliquam. Aliquam bibendum imperdiet nibh vel euismod. Donec sed justo quis mauris porttitor accumsan. Ut sit amet quam pretium, imperdiet metus sed, blandit leo. Duis euismod magna sed nisl suscipit, blandit tempor felis fringilla. Quisque mattis lacus enim, ac pharetra eros laoreet vitae.",
  };

  // Utility functions
  function getFuelType(carData) {
    if (carData.fuel_Benzin) return "Benzin";
    if (carData.fuel_Dizel) return "Dizel";
    if (carData.fuel_Elektro) return "Electric";
    if (carData.fuel_Hibrid) return "Hybrid";
    if (carData.fuel_Plin) return "Gas";
    return "Unknown";
  }

  function getDriveType(carData) {
    if (carData.pogon_Prednji) return "Front";
    if (carData.pogon_Zadnji) return "Rear";
    if (carData.pogon_Sva) return "All-wheel";
    return "Unknown";
  }

  const CarCardContainer = styled(motion.div)(({ theme }) => ({
    width: "85%",
    height: "100%",
    margin: "5%",
    padding: "20px",
    display: "flex",
    gridColumn: "1 / 3",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[4],
    cursor: "pointer",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
    },
  }));

  const CarName = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 800,
    marginBottom: "15px",
    color: theme.palette.text.primary,
  }));

  const CarImage = styled("img")({
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "15px",
    objectFit: "cover",
  });

  const RowStatsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "360px",
    overflowY: "auto",
    padding: "10px 0",
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: "15px",
  }));

  const RowStats = styled(Box)(({ theme }) => ({
    width: "calc(100% - 60px)",
    height: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    marginBottom: "10px",
    margin: "5px 30px",
  }));

  const Price = styled(Typography)(({ theme }) => ({
    fontSize: "1.8rem",
    fontWeight: 800,
    color: theme.palette.success.main,
    margin: "15px 30px 5px 30px",
  }));

  const Description = styled(Typography)(({theme}) => ({
    margin: '10px 30px'
  }));

  const FeatureIcon = ({ isAvailable }) => {
    return isAvailable ? (
      <CheckIcon style={{ color: "green" }} />
    ) : (
      <CloseIcon style={{ color: "red" }} />
    );
  };

  return (
    <CarCardContainer
      onClick={closeDetailedDescription}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CarName variant="h5">{carData.type_encoded || "Tesla Model S"}</CarName>
      <CarImage
        src={carData.image || "https://via.placeholder.com/600x400"}
        alt="Car Image"
      />
      <RowStatsContainer>
        <RowStats>
          <Typography>
            Displacement: {carData.displacement || "Electric"}
          </Typography>
          <Typography>Doors: {carData.doors || 4}</Typography>
        </RowStats>
        <RowStats>
          <Typography>Power: {carData.kilowatts || 340} KW</Typography>
          <Typography>Mileage: {carData.mileage || 15000} km</Typography>
        </RowStats>
        <RowStats>
          <Typography>Year: {carData.year || 2022}</Typography>
          <Typography>
            Transmission: {carData.transmission || "Automatic"}
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            Cruise Control: <FeatureIcon isAvailable={carData.cruiseControl} />
          </Typography>
          <Typography>
            Parking Sensors:{" "}
            <FeatureIcon isAvailable={carData.parkingSensors} />
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            Air Condition: <FeatureIcon isAvailable={carData.airCondition} />
          </Typography>
          <Typography>
            Navigation: <FeatureIcon isAvailable={carData.navigation} />
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            Registration: {carData.registration || "Registered"}
          </Typography>
          <Typography>
            Fuel Type: {getFuelType(carData) || "Electric"}
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            Drive Type: {getDriveType(carData) || "All-wheel"}
          </Typography>
        </RowStats>
        <Price>{carData.price || "100000 USD"}</Price>
        <Description>
          <Typography variant="body2">
            {carData.description ||
              "A cutting-edge electric car with top-tier performance and features."}
          </Typography>
        </Description>
      </RowStatsContainer>
    </CarCardContainer>
  );
}

export default CarDetails;
