import React from 'react';
import { ButtonContainer, StyledButton } from '../../../styles/CustomerStyle/BackNextButtonsStyle';

const BackAndNextButtons = ({ onBackClick, onNextClick, disableBack, disableNext }) => {
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
      <StyledButton
        variant="contained"
        color="primary"
        onClick={onNextClick}
        disabled={disableNext}
      >
        NEXT
      </StyledButton>
    </ButtonContainer>
  );
};

export default BackAndNextButtons;