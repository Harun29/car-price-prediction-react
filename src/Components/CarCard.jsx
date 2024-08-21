import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const images = [
  "Amarok Mk1 (2010-2022).png",
  "Amarok Mk2 (2022-2024).png",
  "Arteon (2017-2024).png",
  "Beetle A5 (2011-2019).png",
  "Beetle Type 1 (1938-2003).png",
  "Caddy Mk1 (1979-1995).png",
  "Caddy Mk2 (1995-2003).png",
  "Caddy Mk3 (2004-2015).png",
  "Caddy Mk4 (2015-2020).png",
  "Caddy Mk5 (2020-2024).png",
  "Eos Mk1 (2006-2015).png",
  "Golf Mk1 (1974-1983).png",
  "Golf Mk2 (1983-1991).png",
  "Golf Mk3 (1991-1997).png",
  "Golf Mk4 (1997-2003).png",
  "Golf Mk5 (2003-2009).png",
  "Golf Mk6 (2008-2012).png",
  "Golf Mk7 (2012-2019).png",
  "Golf Mk8 (2019-2024).png",
  "ID.3 Mk1 (2019-2024).png",
  "ID.4 Mk1 (2020-2024).png",
  "ID.5 Mk1 (2021-2024).png",
  "Jetta Mk1 (1979-1984).png",
  "Jetta Mk2 (1984-1992).png",
  "Jetta Mk3 (1992-1999).png",
  "Jetta Mk4 (1999-2005).png",
  "Jetta Mk5 (2005-2010).png",
  "Jetta Mk6 (2010-2018).png",
  "Jetta Mk7 (2018-2024).png",
  "New Beetle (1997-2011).png",
  "Passat B1 (1973-1981).png",
  "Passat B2 (1981-1988).png",
  "Passat B3 (1988-1993).png",
  "Passat B4 (1993-1997).png",
  "Passat B5 (1996-2005).png",
  "Passat B6 (2005-2010).png",
  "Passat B7 (2010-2014).png",
  "Passat B8 (2014-2024).png",
  "Phaeton Mk1 (2002-2016).png",
  "Polo Mk1 (1975-1981).png",
  "Polo Mk2 (1981-1994).png",
  "Polo Mk3 (1994-2002).png",
  "Polo Mk4 (2002-2009).png",
  "Polo Mk5 (2009-2017).png",
  "Polo Mk6 (2017-2024).png",
  "Scirocco Mk1 (1974-1981).png",
  "Scirocco Mk2 (1981-1992).png",
  "Scirocco Mk3 (2008-2017).png",
  "T-Cross Mk1 (2018-2024).png",
  "T-Roc Mk1 (2017-2024).png",
  "T1 (1950-1967).png",
  "T2 (1967-1979).png",
  "T3 (1979-1992).png",
  "T4 (1990-2003).png",
  "T5 (2003-2015).png",
  "T6 (2015-2019).png",
  "T7 (2021-2024).png",
  "Tiguan Mk1 (2007-2016).png",
  "Tiguan Mk2 (2016-2024).png",
  "Touareg Mk1 (2002-2010).png",
  "Touareg Mk2 (2010-2018).png",
  "Touareg Mk3 (2018-2024).png",
  "Up! Mk1 (2011-2024).png",
];


function selectCarImage(model, year) {
  const parseImageFilename = (filename) => {
    const modelMatch = filename.match(/^[a-zA-Z\s]+/);
    const yearRangeMatch = filename.match(/\((\d{4})-(\d{4})\)/);

    if (modelMatch && yearRangeMatch) {
      const [_, startYear, endYear] = yearRangeMatch;
      return {
        model: modelMatch[0].trim(),
        startYear: parseInt(startYear),
        endYear: parseInt(endYear),
      };
    }
    return null;
  };

  const modelLowerCase = model.toLowerCase();

  for (let image of images) {
    const parsed = parseImageFilename(image);
    if (parsed && parsed.model.toLowerCase().includes(modelLowerCase)) {
      if (year >= parsed.startYear && year <= parsed.endYear) {
        return `/CarPictures/${image}`;
      }
    }
  }

  return "/CarPictures/default-car.png";
}


function CarCard({ data, handleDetailedDescription }) {
  const carDetails = {
    name: `${data.manufacturer} ${data.model}`,
    model: data.displacement,
    power: `${data.kilowatts}KW`,
    year: data.year,
    mileage: `${data.mileage}km`,
    price: `${data.price}KM`,
  };

  const carImage = selectCarImage(data.model, data.year);

  const handleIconClick = (e) => {
    e.stopPropagation();
    const message = `Tell me more about the (maximum 50 words) ${carDetails.name}.`;
    // Handle the icon click event (e.g., send the message to a chat or console log)
  };

  const CarCardContainer = styled(motion.div)(({ theme }) => ({
    width: "90%",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderRadius: "20px",
    boxShadow: theme.shadows[2],
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
  }));

  const CarName = styled("span")(({ theme }) => ({
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: theme.palette.text.primary,
  }));

  const RowStats = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
    marginBottom: "5px",
    "& span": {
      display: "flex",
      width: "50%",
      margin: "0 10px",
      flexDirection: "column",
      "& span:nth-child(1)": {
        color: theme.palette.text.disabled,
      },
    },
    "& span:nth-child(1)": {
      alignItems: "end",
    },
    "& span:nth-child(2)": {
      alignItems: "start",
    },
  }));

  const Price = styled("span")(({ theme }) => ({
    fontSize: "1.4rem",
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginTop: "10px",
    padding: "5px 0",
  }));

  return (
    <CarCardContainer
      onClick={() => handleDetailedDescription(data, carImage)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
      }}
      style={{
        height: "100%"
      }}
    >
      <CarName>{carDetails.name}</CarName>
      <img
        src={carImage}
        alt={carDetails.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <RowStats>
        <span>{carDetails.model}</span>
        <span>{carDetails.power}</span>
      </RowStats>
      <RowStats>
        <span>{carDetails.year}</span>
        <span>{carDetails.mileage}</span>
      </RowStats>
      <Price>{carDetails.price}</Price>
      <AutoAwesomeIcon
        onClick={(e) => handleIconClick(e)}
        style={{ cursor: "pointer", marginTop: "10px" }}
      />
    </CarCardContainer>
  );
}

export default CarCard;
