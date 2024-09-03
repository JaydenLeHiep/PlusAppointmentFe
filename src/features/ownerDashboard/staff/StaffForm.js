import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import { 
  FormContainer, 
  StyledIconButton, 
  StyledTypography, 
  StyledTextField, 
  CancelButton, 
  ActionButton 
} from '../../../styles/OwnerStyle/StaffComPonent/StaffFormStyles'; 
import { Close as CloseIcon } from '@mui/icons-material';
import { Box } from '@mui/material';

const StaffForm = ({ title, newStaff, setNewStaff, handleAction, handleCancelForm, buttonText, buttonColor }) => {
    const { t } = useTranslation('staffForm'); 
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <FormContainer ref={formRef}>
            <StyledIconButton
                onClick={handleCancelForm}
            >
                <CloseIcon />
            </StyledIconButton>

            <StyledTypography variant="h6">
                {title}
            </StyledTypography>

            <StyledTextField
                margin="dense"
                label={t('name')} 
                type="text"
                fullWidth
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            />
            <StyledTextField
                margin="dense"
                label={t('email')} 
                type="email"
                fullWidth
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
            />
            <StyledTextField
                margin="dense"
                label={t('phone')}
                type="text"
                fullWidth
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
            />
            <StyledTextField
                margin="dense"
                label={t('password')} 
                type="password"
                fullWidth
                value={newStaff.password}
                onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
            />

            <Box mt={3} display="flex" justifyContent="space-between">
                <CancelButton onClick={handleCancelForm}>
                    {t('cancel')}
                </CancelButton>
                <ActionButton onClick={handleAction} buttonColor={buttonColor}>
                    {buttonText}
                </ActionButton>
            </Box>
        </FormContainer>
    );
};

export default StaffForm;