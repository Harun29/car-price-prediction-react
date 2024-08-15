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
      text: {
        fill: theme.palette.text.primary,
      },
    },
    grid: {
      line: {
        stroke: theme.palette.mode === 'dark' ? '#888' : '#ccc', // Dynamic color based on theme
        strokeWidth: 1,
      },
    },
    arc: {
      borderWidth: 1,
      borderColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
    },
    tooltip: {
      container: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    },
  };
};

export default useNivoTheme;
