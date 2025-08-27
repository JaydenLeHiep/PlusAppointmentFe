import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import LoginStaffHero from './LoginStaffHero';
import NavbarStaff from '../../../components/NavbarStaff';
import Footer from '../../../components/Footer';

const LoginStaffPage = () => {
    useEffect(() => {
        localStorage.setItem('currentPath', window.location.pathname);
      }, []);
    
      return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <NavbarStaff />
            <LoginStaffHero />
            <Footer/>
        </Box>
      );
}

export default LoginStaffPage;