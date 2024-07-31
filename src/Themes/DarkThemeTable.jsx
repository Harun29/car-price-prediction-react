import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MaterialTable from '@material-table/core';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function DarkThemeTable({ title, columns, data }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={{
          search: true,
          sorting: false,
          exportButton: true,
        }}
      />
    </ThemeProvider>
  );
}

export default DarkThemeTable;
