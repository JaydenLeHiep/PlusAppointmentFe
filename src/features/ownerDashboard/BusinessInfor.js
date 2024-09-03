import React from 'react';
import {
  BusinessInfoContainer,
  BusinessInfoHeader,
  IconButtonGroup,
  CustomBadge,
  BusinessName,
  IconStyle,
} from '../../styles/OwnerStyle/BusinessInfoStyles';
import { Box,IconButton } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Face2Icon from '@mui/icons-material/Face2';

const BusinessInfo = ({
  selectedBusiness,
  handleStaffOpen,
  handleServiceOpen,
  handleCustomerOpen,
  servicesCount,
  staffCount,
  onBack,
  onAddAppointment,
}) => {
  return (
    <BusinessInfoContainer>
      <BusinessInfoHeader>
        <IconButtonGroup>
          <IconButton color="primary" onClick={onBack}>
            <ArrowCircleLeftTwoToneIcon sx={IconStyle} />
          </IconButton>
          <IconButton color="secondary" onClick={onAddAppointment}>
            <AddCircleTwoToneIcon sx={IconStyle} />
          </IconButton>
          <IconButton color="primary" onClick={handleCustomerOpen}>
            <Face2Icon sx={IconStyle} />
          </IconButton>
        </IconButtonGroup>
        <IconButtonGroup>
          <CustomBadge badgeContent={staffCount} color="primary">
            <InsertEmoticonTwoToneIcon
              onClick={handleStaffOpen}
              sx={IconStyle}
            />
          </CustomBadge>
          <CustomBadge
            badgeContent={servicesCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: 'green', color: 'white' } }}
          >
            <AutoAwesomeTwoToneIcon
              onClick={handleServiceOpen}
              sx={IconStyle}
            />
          </CustomBadge>
        </IconButtonGroup>
      </BusinessInfoHeader>
      <Box mt={2}>
        <BusinessName variant="h3" gutterBottom>
          {selectedBusiness.name}
        </BusinessName>
      </Box>
    </BusinessInfoContainer>
  );
};

export default BusinessInfo;