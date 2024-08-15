import { useTheme } from '@mui/material/styles';

const useNivoTheme = () => {
  const theme = useTheme();

  return {
    axis: {
      ticks: {
        line: {
          stroke: theme.palette.mode === 'dark' ? '#fff' : '#333', // Dynamic color based on theme
        },
        text: {
          fill: theme.palette.text.primary,
        },
      },
      legend: {
        line: {
          stroke: theme.palette.mode === 'dark' ? '#fff' : '#333', // Dynamic color based on theme
        },
        text: {
          fill: theme.palette.text.primary,
        },
      },
    },
    legends: {
      line: {
        stroke: theme.palette.mode === 'dark' ? '#fff' : '#333',
      },
      text: {
        fill: theme.palette.text.primary,
      },
    },
    grid: {
      line: {
        stroke: theme.palette.mode === 'dark' ? '#888' : '#ccc',
        strokeWidth: 1,
      },
      text: {
        fill: theme.palette.text.primary,
      },
    },
    annotations:{
      line: {
        stroke: theme.palette.mode === 'dark' ? '#fff' : '#333',
      },
      text: {
        fill: theme.palette.text.primary,
      }
    }
  };
};

export default useNivoTheme;
