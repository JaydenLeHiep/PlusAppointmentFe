import React, { useRef, useEffect } from 'react';
import { Box, MenuItem, Select, InputLabel } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useServicesContext } from '../../../context/ServicesContext';
import {
  FormContainer,
  CloseButtonStyled,
  TitleStyled,
  TextFieldStyled,
  FormControlStyled,
  CancelButtonStyled,
  ActionButtonStyled
} from '../../../styles/OwnerStyle/ServiceComponent/ServiceFormStyles';

const ServiceForm = ({ title, newService, setNewService, handleAction, handleCancelForm, buttonText, buttonColor }) => {
  const { t } = useTranslation('serviceServiceForm');
  const formRef = useRef(null);
  const { categories } = useServicesContext();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <FormContainer ref={formRef}>
      <CloseButtonStyled onClick={handleCancelForm}>
        <CloseIcon />
      </CloseButtonStyled>

      <TitleStyled variant="h6">
        {title}
      </TitleStyled>
      
      <TextFieldStyled
        margin="dense"
        label={t('nameLabel')}
        type="text"
        fullWidth
        value={newService.name}
        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
      />
      <TextFieldStyled
        margin="dense"
        label={t('descriptionLabel')}
        type="text"
        fullWidth
        value={newService.description}
        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
      />
      <TextFieldStyled
        margin="dense"
        label={t('durationLabel')}
        type="time"
        fullWidth
        value={newService.duration}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5 min steps
        onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
      />
      <TextFieldStyled
        margin="dense"
        label={t('priceLabel')}
        type="number"
        fullWidth
        value={newService.price}
        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
      />

      <FormControlStyled fullWidth margin="dense">
        <InputLabel>{t('categoryLabel')}</InputLabel>
        <Select
          value={newService.categoryId || ''}
          onChange={(e) => setNewService({ ...newService, categoryId: e.target.value })}
          label={t('categoryLabel')}
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControlStyled>

      <Box mt={3} display="flex" justifyContent="space-between">
        <CancelButtonStyled onClick={handleCancelForm}>
          {t('cancelButton')}
        </CancelButtonStyled>
        <ActionButtonStyled onClick={handleAction} buttonColor={buttonColor}>
          {t(buttonText)}
        </ActionButtonStyled>
      </Box>
    </FormContainer>
  );
};

export default ServiceForm;