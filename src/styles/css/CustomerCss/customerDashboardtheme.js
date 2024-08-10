import { createTheme } from '@mui/material/styles';

const customerDashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#f3d4d5', // Your specific color for the CustomerDashboard
    },
    secondary: {
      main: '#1976d2',
    },
    error: {
      main: '#ff1744',
    },
  },
  typography: {
    h6: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
      color: '#444',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default customerDashboardTheme;