import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

function CarDetails({ data, carImage, closeDetailedDescription }) {

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
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    marginBottom: "15px",
    color: theme.palette.text.primary,
  }));

  const CarImage = styled("img")({
    width: "100%",
    height: "300px",
    objectFit: "contain",
    float: "start",
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
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    color: theme.palette.text.primary,
    marginBottom: "10px",
    margin: "5px 30px",
    "& p": {
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      width: "50%",
      margin: "20px",
      flexDirection: "column",
      "& span:nth-child(1)": {
        color: theme.palette.text.disabled,
      },
    },
    "& p:nth-child(1)": {
      alignItems: "end",
    },
    "& p:nth-child(2)": {
      alignItems: "start",
    }
  }));

  const RowStatLast = styled(Box)(({ theme }) => ({
    width: "calc(100% - 60px)",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    color: theme.palette.text.primary,
    marginBottom: "10px",
    margin: "5px 30px",
    "& p": {
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      alignItems: "center",
      width: "50%",
      margin: "20px",
      flexDirection: "column",
      "& span:nth-child(1)": {
        color: theme.palette.text.disabled,
      },
    }
  }));

  const Price = styled(Typography)(({ theme }) => ({
    fontSize: "1.8rem",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    color: theme.palette.success.main,
    margin: "15px 30px 5px 30px",
  }));

  const Description = styled(Typography)(({ theme }) => ({
    margin: "10px 30px",
    "& p": {
      fontFamily: "'Poppins', sans-serif",
    }
  }));

  const FeatureIcon = ({ isAvailable }) => {
    return isAvailable ? (
      <CheckIcon style={{ color: "green" }} />
    ) : (
      <CloseIcon style={{ color: "red" }} />
    );
  };

  useEffect(() => {
    data && console.log(data)
  }, [data])

  return (
    <CarCardContainer
      onClick={closeDetailedDescription}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CarName variant="h5">{data.manufacturer+ " " + data.model}</CarName>
      <CarImage
        src={carImage || "https://via.placeholder.com/600x400"}
        alt="Car Image"
      />
      <RowStatsContainer>
        <RowStats>
          <Typography>
            <span>Displacement</span>
            <span>{data.displacement || "Electric"}</span>
          </Typography>
          <Typography>
            <span>Doors</span>
            <span>{data.doors || 4}</span>
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            <span>Power</span>
            <span>{data.kilowatts || 340} KW</span>
          </Typography>
          <Typography>
            <span>Mileage</span>
            <span>{data.mileage || 15000} km</span>
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            <span>Year</span>
            <span>{data.year || 2022}</span>
          </Typography>
          <Typography>
            <span>Transmission</span>
            <span>{data.transmission || "Automatic"}</span>
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            <span>Cruise Control</span>
            <FeatureIcon isAvailable={data.cruisecontrol} />
          </Typography>
          <Typography>
            <span>Parking Sensors</span>
            <FeatureIcon isAvailable={data.parkingsensors} />
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            <span>Air Condition</span>
            <FeatureIcon isAvailable={data.aircondition} />
          </Typography>
          <Typography>
            <span>Navigation</span>
            <FeatureIcon isAvailable={data.navigation} />
          </Typography>
        </RowStats>
        <RowStats>
          <Typography>
            <span>Registration</span>
            <span>{data.registration || "Registered"}</span>
          </Typography>
          <Typography>
            <span>Fuel Type</span>
            <span>{data.fuel || "Electric"}</span>
          </Typography>
        </RowStats>
        <RowStatLast>
          <Typography>
            <span>Drive Type</span>
            <span> {data.drivetrain || "All-wheel"}</span>
          </Typography>
        </RowStatLast>
        <Price>{data.price || "100000 USD"}</Price>
        <Description>
          <Typography variant="body2">
            {data.title ||
              "A cutting-edge electric car with top-tier performance and features."}
          </Typography>
        </Description>
      </RowStatsContainer>
    </CarCardContainer>
  );
}

export default CarDetails;
