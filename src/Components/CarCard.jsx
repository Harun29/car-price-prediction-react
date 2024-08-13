import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

function CarCard({handleDetailedDescription}) {
  const CarCardContainer = styled(motion.div)(({ theme }) => ({
    width: '90%',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
    borderRadius: '10px',
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
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    marginBottom: '5px',
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
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
      }}
    >
      <CarName>VW TIGUAN</CarName>
      <img src="tiguan2023.png" alt="Car Image" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }} />
      <RowStats>
        <span>2.5 TDI</span>
        <span>150 KW</span>
      </RowStats>
      <RowStats>
        <span>2023</span>
        <span>6000km</span>
      </RowStats>
      <Price>75000KM</Price>
    </CarCardContainer>
  );
}

export default CarCard;
