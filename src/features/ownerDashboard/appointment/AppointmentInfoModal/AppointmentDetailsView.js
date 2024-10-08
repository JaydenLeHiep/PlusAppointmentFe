import React from 'react';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {
    DetailsContainer,
    DetailsBox,
    TitleTypography,
    SectionDivider,
    InfoTypography,
    IconButtonContainer,
    ServiceBox,
    ServiceTitleTypography,
    ServiceTypography
} from '../../../../styles/OwnerStyle/AppointmentInfoModal/AppointmentDetailsViewStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AppointmentDetailsView = ({ appointment, formatAppointmentTime, handleToggleEditMode, handleDeleteAppointment }) => {
    const { t } = useTranslation('appointmentDetailsView');
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <DetailsContainer>
            <DetailsBox>
                <TitleTypography gutterBottom>
                    {t('client')}: {!isMobile && appointment.customerName}
                </TitleTypography>

                <SectionDivider />

                {/* On mobile, move the customer name here */}
                {isMobile && (
                    <InfoTypography variant="body1">
                        <strong>{t('client')}:</strong> {appointment.customerName}
                    </InfoTypography>
                )}

                <InfoTypography variant="body1">
                    <strong>{t('phone')}:</strong> {appointment.customerPhone}
                </InfoTypography>

                {/* <InfoTypography variant="body1">
        <strong>{t('time')}:</strong> {formatAppointmentTime(appointment.appointmentTime, appointment.duration)}
    </InfoTypography> */}

                <InfoTypography variant="body1">
                    <strong>{t('comment')}:</strong> {appointment.comment}
                </InfoTypography>

                <IconButtonContainer>
                    <IconButton aria-label={t('edit')} onClick={handleToggleEditMode}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label={t('delete')} onClick={handleDeleteAppointment}>
                        <DeleteIcon />
                    </IconButton>
                </IconButtonContainer>
            </DetailsBox>

            <ServiceBox>
                <ServiceTitleTypography variant="h6" gutterBottom>
                    {t('servicesAndStaff')}
                </ServiceTitleTypography>
                <SectionDivider sx={{ borderColor: '#28a745' }} />
                {appointment.services.$values.map((service, index) => (
                    <ServiceTypography key={index} variant="body2" gutterBottom>
                        <strong>{index + 1}.</strong>
                        {service.name} - {service.categoryName} - <strong>{service.staffName}</strong>
                    </ServiceTypography>
                ))}
            </ServiceBox>
        </DetailsContainer>
    );
};

export default AppointmentDetailsView;