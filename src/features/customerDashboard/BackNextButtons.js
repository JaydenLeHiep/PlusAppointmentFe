import React from 'react';
import { Box, InputAdornment } from '@mui/material';
import {
  ButtonContainer,
  StyledButton,
  StyledTextFieldContainer,
  StyledTextField,
  RopeContainer,
  IconContainer,
  IconTreeContainer,
  RopeTreeContainer,
  RopeManContainer,
  RopeBellContainer,
  IconBellContainer
} from '../../styles/CustomerStyle/BackNextButtonsStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

import TreeIcon from '../../assets/christmas-tree.png';
import BellIcon from '../../assets/packard-bell.png';
import Cookies from '../../assets/gingerbread-man.png 00-30-41-648.png';
import Ball from '../../assets/christmas-ball.png';

const BackAndNextButtons = ({
  onBackClick,
  onNextClick,
  disableBack,
  disableNext,
  searchQuery,
  onSearchChange,
  view,
}) => {
  const { t } = useTranslation('backNextButton');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearchChange(query);
  };

  return (
    <ButtonContainer>
      {view !== 'thankYou' && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledButton
            variant="contained"
            color="primary"
            onClick={onBackClick}
            disabled={disableBack}
          >
            {t('back')}
          </StyledButton>
          <Box position="relative" display="flex" width="100%">
            {/* Left Half with its RopeContainer */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flex="1"
            >
              <RopeTreeContainer>
                <IconTreeContainer>
                  <img src={TreeIcon} alt="Christmas Tree" />
                </IconTreeContainer>
              </RopeTreeContainer>
            </Box>
            {/* Right Half with its RopeContainer */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flex="1"
            >
              <RopeManContainer>
                <IconContainer>
                  <img src={Cookies} alt="Cookie" />
                </IconContainer>
              </RopeManContainer>
            </Box>
          </Box>
        </Box>
      )}

      {(view === 'services' || view === 'staffs') && (
        <StyledTextFieldContainer>
          <Box position="relative" width="100%" display="flex" flexDirection="column" alignItems="center">
            <StyledTextField
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: 'black' }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* Icon below the search bar */}
            <Box mt={2}>
              <RopeBellContainer style={{ marginLeft: '100px' }}>
                <IconBellContainer> {/* Push the icon slightly to the right */}
                  <img src={BellIcon} alt="Christmas Ball" />
                </IconBellContainer>
              </RopeBellContainer>
            </Box>
          </Box>
        </StyledTextFieldContainer>
      )}

      {(view === 'services' || view === 'staffs') && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledButton
            variant="contained"
            color="primary"
            onClick={onNextClick}
            disabled={disableNext}
          >
            {t('next')}
          </StyledButton>
          <Box position="relative" mt={2}>
            <RopeContainer style={{ marginLeft: ' 40px' }}>
              <IconContainer>
                <img src={Ball} alt="Christmas Ball" />
              </IconContainer>
            </RopeContainer>
          </Box>
        </Box>
      )}
    </ButtonContainer>
  );
};

export default BackAndNextButtons;