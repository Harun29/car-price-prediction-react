import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useChat } from '../Context/ChatContext';

function CarCard({ handleDetailedDescription }) {
  const {
    handleFormSubmit
  } = useChat();
  
  const carDetails = {
    name: "VW TIGUAN",
    model: "2.5 TDI",
    power: "150 KW",
    year: "2023",
    mileage: "6000km",
    price: "75000KM"
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    const message = `Tell me more about the ${carDetails.name}.`;
    handleFormSubmit(message); // Pass the message to handleFormSubmit
  };

  const CarCardContainer = styled(motion.div)(({ theme }) => ({
    width: '90%',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: '20px',
    boxShadow: theme.shadows[2],
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease',
  }));
  
  const CarName = styled('span')(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '10px',
    color: theme.palette.text.primary,
  }));
  
  const RowStats = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    marginBottom: '5px',
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
    }
  }));
  
  const Price = styled('span')(({ theme }) => ({
    fontSize: '1.4rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginTop: '10px',
    padding: '5px 0',
  }));

  return (
    <CarCardContainer
      onClick={handleDetailedDescription}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)'
      }}
    >
      <CarName>{carDetails.name}</CarName>
      <img src="tiguan2023.png" alt="Car Image" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }} />
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
        onClick={handleIconClick} 
        style={{ cursor: 'pointer', marginTop: '10px' }} 
      />
    </CarCardContainer>
  );
}

export default CarCard;
