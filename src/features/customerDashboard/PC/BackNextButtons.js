import React from 'react';
import { Box } from '@mui/material';
import { ButtonContainer, StyledButton, StyledTextFieldContainer, StyledTextField } from '../../../styles/CustomerStyle/BackNextButtonsStyle';

const BackAndNextButtons = ({ onBackClick, onNextClick, disableBack, disableNext, searchQuery, onSearchChange }) => {
  return (
    <ButtonContainer>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={onBackClick}
        disabled={disableBack}
      >
        BACK
      </StyledButton>
      
      <StyledTextFieldContainer>
        <StyledTextField
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="outlined"
        />
      </StyledTextFieldContainer>

      <Box sx={{ minWidth: '150px', display: 'flex', justifyContent: 'flex-end' }}>
        {!disableNext && (
          <StyledButton
            variant="contained"
            color="primary"
            onClick={onNextClick}
            disabled={disableNext}
          >
            NEXT
          </StyledButton>
        )}
      </Box>
    </ButtonContainer>
  );
};

export default BackAndNextButtons;