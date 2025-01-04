import React from 'react';
import { Box, InputAdornment } from '@mui/material';
import {
  ButtonContainer,
  StyledButton,
  StyledTextFieldContainer,
  StyledTextField,
} from '../../styles/CustomerStyle/BackNextButtonsStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

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
        </Box>
      )}
    </ButtonContainer>
  );
};

export default BackAndNextButtons;