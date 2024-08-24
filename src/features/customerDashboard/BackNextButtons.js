import React from 'react';
import { Box, InputAdornment } from '@mui/material';
import { ButtonContainer, StyledButton, StyledTextFieldContainer, StyledTextField } from '../../styles/CustomerStyle/BackNextButtonsStyle';
import SearchIcon from '@mui/icons-material/Search';

const BackAndNextButtons = ({ onBackClick, onNextClick, disableBack, disableNext, searchQuery, onSearchChange, view, isAddingNewCustomer }) => {
  return (
    <ButtonContainer>
      {view !== 'thankYou' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={onBackClick}
            disabled={disableBack}
          >
            BACK
          </StyledButton>
        </Box>
      )}

      {(view === 'services' || view === 'staffs') && (
        <StyledTextFieldContainer>
          <StyledTextField
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </StyledTextFieldContainer>
      )}

      {(view === 'services' || view === 'staffs') && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={onNextClick}
            disabled={disableNext}
          >
            NEXT
          </StyledButton>
        </Box>
      )}
    </ButtonContainer>
  );
};

export default BackAndNextButtons;