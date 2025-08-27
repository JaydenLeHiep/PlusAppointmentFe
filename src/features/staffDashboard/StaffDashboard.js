import React from 'react';
import NavbarStaff from '../../components/NavbarStaff';
import Footer from '../../components/Footer';

const StaffDashboard = () => {
  return (
    <>
      <NavbarStaff />
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Hello Staff 👋</h1>
        <p>Welcome to your dashboard.</p>
      </div>
      <Footer/>
    </>
  );
};

export default StaffDashboard;
