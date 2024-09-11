import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const images = [
  "100 (1982-1991).png",
  "100 (1991-1994).png",
  "80 (1986-1991).png",
  "80 (1991-1996).png",
  "90 (1987-1995).png",
  "A1 (2010-2018).png",
  "A1 (2018-2024).png",
  "A2 (1999-2005).png",
  "A3 (2003-2008).png",
  "A3 (2008-2012).png",
  "A3 (2012-2020).png",
  "A3 (2020-2024).png",
  "A4 (1994-2001).png",
  "A4 (2001-2008).png",
  "A4 (2008-2015).png",
  "A4 (2015-2024).png",
  "A4 Allroad (2009-2016).png",
  "A4 Allroad (2016-2024).png",
  "A5 (2007-2016).png",
  "A5 (2016-2024).png",
  "A6 (1997-2004).png",
  "A6 (2004-2011).png",
  "A6 (2011-2018).png",
  "A6 (2018-2024).png",
  "A6 Allroad (1999-2006).png",
  "A6 Allroad (2006-2012).png",
  "A6 Allroad (2012-2018).png",
  "A6 Allroad (2019-2024).png",
  "A7 (2010-2017).png",
  "A7 (2017-2024).png",
  "A8 (1994-2002).png",
  "A8 (2002-2009).png",
  "A8 (2009-2017).png",
  "A8 (2017-2024).png",
  "Amarok Mk1 (2010-2022).png",
  "Amarok Mk2 (2022-2024).png",
  "Arteon (2017-2024).png",
  "Beetle A5 (2011-2019).png",
  "Beetle Type 1 (1938-2003).png",
  "Bora (1998-2005).png",
  "Caddy Mk1 (1979-1995).png",
  "Caddy Mk2 (1995-2003).png",
  "Caddy Mk3 (2004-2015).png",
  "Caddy Mk4 (2015-2020).png",
  "Caddy Mk5 (2020-2024).png",
  "CC (2009-2011).png",
  "CC (2012-2017).png",
  "e-tron (2019-2024).png",
  "e-tron GT (2020-2024).png",
  "Eos Mk1 (2006-2015).png",
  "Golf mk1 (1974-1983).png",
  "Golf mk2 (1983-1991).png",
  "Golf mk3 (1991-1997).png",
  "Golf mk4 (1997-2003).png",
  "Golf mk5 (2003-2009).png",
  "Golf mk6 (2008-2012).png",
  "Golf mk7 (2012-2019).png",
  "Golf mk8 (2019-2024).png",
  "Golf Plus (2005-2008).png",
  "Golf Plus (2008-2013).png",
  "Golf Variant (1993-1999).png",
  "Golf Variant (1999-2006).png",
  "Golf Variant (2007-2009).png",
  "Golf Variant (2009-2013).png",
  "Golf Variant (2013-2017).png",
  "Golf Variant (2017-2020).png",
  "Golf Variant (2020-2024).png",
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
  "Q2 (2016-2024).png",
  "Q3 (2011-2018).png",
  "Q3 (2018-2024).png",
  "Q4 e-tron (2021-2024).png",
  "Q5 (2008-2017).png",
  "Q5 (2017-2024).png",
  "Q7 (2005-2015).png",
  "Q7 (2015-2024).png",
  "Q8 (2018-2024).png",
  "Q8 e-tron (2023-2024).png",
  "R8 (2006-2015).png",
  "R8 (2016-2024).png",
  "RS3 (2011-2018).png",
  "RS3 (2019-2024).png",
  "RS4 (1999-2001).png",
  "RS4 (2002-2008).png",
  "RS4 (2009-2015).png",
  "RS4 (2016-2024).png",
  "RS5 (2010-2016).png",
  "RS5 (2017-2024).png",
  "RS6 (2002-2011).png",
  "RS6 (2012-2024).png",
  "RS7 (2013-2019).png",
  "RS7 (2020-2024).png",
  "RSQ3 (2013-2024).png",
  "RSQ8 (2020-2024).png",
  "S1 (2014-2018).png",
  "S3 (1999-2003).png",
  "S3 (2006-2013).png",
  "S3 (2013-2020).png",
  "S3 (2020-2024).png",
  "S4 (1997-2002).png",
  "S4 (2003-2008).png",
  "S4 (2009-2016).png",
  "S4 (2017-2024).png",
  "S5 (2007-2016).png",
  "S5 (2017-2024).png",
  "S6 (1999-2004).png",
  "S6 (2005-2011).png",
  "S6 (2012-2018).png",
  "S6 (2019-2024).png",
  "S7 (2012-2017).png",
  "S7 (2018-2024).png",
  "S8 (1996-2002).png",
  "S8 (2003-2012).png",
  "S8 (2013-2019).png",
  "S8 (2020-2024).png",
  "Scirocco Mk1 (1974-1981).png",
  "Scirocco Mk2 (1981-1992).png",
  "Scirocco Mk3 (2008-2017).png",
  "Sharan (1996-2000).png",
  "Sharan (2000-2010).png",
  "Sharan (2010-2024).png",
  "SQ2 (2018-2024).png",
  "SQ5 (2013-2017).png",
  "SQ5 (2014-2024).png",
  "SQ7 (2016-2024).png",
  "SQ8 (2018-2024).png",
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
  "Touran (2003-2006).png",
  "Touran (2006-2010).png",
  "Touran (2010-2015).png",
  "Touran (2015-2024).png",
  "TT (1998-2006).png",
  "TT (2006-2014).png",
  "TT (2014-2024).png",
  "Up! Mk1 (2011-2024).png",
  "V8 (1988-1993).png",
];

const missingImages = [
  // "Golf Variant.png",
  // "Sharan.png",
  // "Bora.png",
  // "Golf Plus.png",
  // "Touran.png",
  // "CC.png",
  "Golf Alltrack.png",
  "T5 Caravelle.png",
  "ID.4 Mk1 (model year specific).png",
  "ID.5 Mk1 (model year specific).png",
  "T5 Multivan.png",
  "Passat Alltrack.png",
  "Passat Variant.png",
  "Golf GTE.png",
  "T6 (model year specific).png",
  "T7 Multivan.png",
  "Buba / Beetle.png",
  "Vento.png",
  "LT.png",
  "Lupo.png",
  "T2 Caravelle.png",
  "T4 Caravelle.png",
  "Phaeton (model year specific).png",
  "Tiguan Allspace.png",
  "T-Cross.png",
  "e-Golf.png",
  "Fox.png",
  "Crafter.png",
  "T6 Caravelle.png",
  "Eos (model year specific).png",
  "Corrado.png",
  "Polo Cross.png",
  "T3 (model year specific).png",
  "Taigo.png",
  "T4 Multivan.png",
  "Santana.png",
  "T6 Multivan.png",
  "T3 Caravelle.png",
  "T3 Multivan.png",
  "New Beetle.png",
  "Buba / Käfer / New Beetle.png",
  "Buggy.png",
  "181.png",
  "Routan.png",
  "Atlas.png",
  "Polo Variant.png",
  "T6 Shuttle.png",
  "Iltis.png",
  "ID.7.png",
  "ID.6.png",
  "XL1.png",
  "T5 Shuttle.png",
];

function selectCarImage(model, year) {
  const parseImageFilename = (filename) => {
    const modelMatch = filename.match(/^[\w\s\-!]+/);
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
    if (parsed) {
      console.log(
        `Parsed model: ${parsed.model}, Start Year: ${parsed.startYear}, End Year: ${parsed.endYear}`
      );
      if (parsed.model.toLowerCase().includes(modelLowerCase)) {
        if (year >= parsed.startYear && year <= parsed.endYear) {
          return `/CarPictures/${image}`;
        }
      }
    }
  }
  return "ghost.png";
}

function CarCard({ data, handleDetailedDescription }) {
  const carDetails = {
    name: `${data.manufacturer} ${data.model}`,
    model: `${data.displacement.toFixed(1)}L`,
    power: `${data.kilowatts}KW`,
    year: data.year,
    mileage: `${data.mileage}km`,
    price: `${data.price}KM`,
  };

  const carImage = selectCarImage(data.model, data.year);
  console.log(carImage);

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
        height: "100%",
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
    </CarCardContainer>
  );
}

export default CarCard;
