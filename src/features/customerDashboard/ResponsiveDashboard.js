import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import PCDashboard from './PC/CustomerDashboard';  // Path to PC version
import MobileDashboard from './Mobile/CustomerDashboard';  // Path to Mobile version

const ResponsiveDashboard = () => {
  const isMobile = useMediaQuery('(max-width:740px)'); // Adjust breakpoint as needed

  return isMobile ? <MobileDashboard /> : <PCDashboard />;
};

export default ResponsiveDashboard;