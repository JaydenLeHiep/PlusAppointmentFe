import React, { useRef, useEffect, useState } from 'react';
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

const StaffForm = ({
  title,
  newStaff,
  setNewStaff,
  handleAction,
  handleCancelForm,
  buttonText,
  buttonColor,
  mode = 'create', 
}) => {
  const { t } = useTranslation('staffForm');
  const formRef = useRef(null);

  // Only validate in create mode
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Create: all required; Update: all optional
  const requiredFields = mode === 'create' ? ['name', 'email', 'phone', 'password'] : [];
  const isFieldEmpty = (field) => !newStaff[field]?.trim();
  const isFormValid = mode === 'create' ? requiredFields.every((field) => !isFieldEmpty(field)) : true;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
    });
    setAttemptedSubmit(true);
    if (isFormValid) {
      handleAction();
    }
  };

  const getError = (field) =>
    mode === 'create' && (touched[field] || attemptedSubmit) && isFieldEmpty(field)
      ? t('requiredField')
      : '';

  return (
    <FormContainer ref={formRef} component="form" onSubmit={handleSubmit} noValidate>
      <StyledIconButton onClick={handleCancelForm}>
        <CloseIcon />
      </StyledIconButton>

      <StyledTypography variant="h6">{title}</StyledTypography>

      <StyledTextField
        margin="dense"
        label={t('name')}
        type="text"
        fullWidth
        value={newStaff.name}
        onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        error={!!getError('name')}
        helperText={getError('name')}
        required={mode === 'create'}
      />
      <StyledTextField
        margin="dense"
        label={t('email')}
        type="email"
        fullWidth
        value={newStaff.email}
        onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        error={!!getError('email')}
        helperText={getError('email')}
        required={mode === 'create'}
      />
      <StyledTextField
        margin="dense"
        label={t('phone')}
        type="text"
        fullWidth
        value={newStaff.phone}
        onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
        error={!!getError('phone')}
        helperText={getError('phone')}
        required={mode === 'create'}
      />
      <StyledTextField
        margin="dense"
        label={t('password')}
        type="password"
        fullWidth
        value={newStaff.password}
        onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        error={!!getError('password')}
        helperText={
          getError('password') ||
          (mode === 'update' ? t('optionalForUpdate') : '')
        }
        required={mode === 'create'}
      />

      <Box mt={3} display="flex" justifyContent="space-between">
        <CancelButton onClick={handleCancelForm}>{t('cancel')}</CancelButton>
        <ActionButton
          type="submit"
          buttonColor={buttonColor}
          disabled={mode === 'create' && attemptedSubmit && !isFormValid}
        >
          {buttonText}
        </ActionButton>
      </Box>
    </FormContainer>
  );
};

export default StaffForm;