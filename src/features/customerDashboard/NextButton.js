import React from 'react';
import { StyledButton, ButtonContainer } from '../../styles/CustomerStyle/BackNextButtonsStyle';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const NextButton = ({ onNextClick, disableNext }) => {
    const { t } = useTranslation('backNextButton');
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', padding: { xs: '16px 0', sm: '24px 0' } }}>
            <ButtonContainer
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    height: '60px',
                    margin: '0 auto',
                    marginBottom: theme.spacing(4),
                    [theme.breakpoints.down('sm')]: {
                        height: '50px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: theme.spacing(2),
                    },
                }}
            >
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={onNextClick}
                    disabled={disableNext}
                >
                    {t('next')}
                </StyledButton>
            </ButtonContainer>
        </Box>
    );
};

export default NextButton;