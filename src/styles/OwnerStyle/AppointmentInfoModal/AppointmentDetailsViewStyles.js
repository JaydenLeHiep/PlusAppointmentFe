import { styled } from '@mui/material/styles';
import { Typography, Divider, Box } from '@mui/material';

export const DetailsContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: '16px',
    backgroundColor: '#e6f2ff',
    borderRadius: '12px',
    position: 'relative',
    marginBottom: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#007bff',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 'calc(100% - 70px)',

    [theme.breakpoints.down('sm')]: {
        fontSize: '1.0rem', 
    },
}));

export const SectionDivider = styled(Divider)(({ theme }) => ({
    borderBottomWidth: 2,
    borderColor: '#007bff',
    marginBottom: '16px',
}));

export const InfoTypography = styled(Typography)(({ theme }) => ({
    color: '#333',
    fontSize: '1.1rem',
    marginBottom: '12px',
}));

export const IconButtonContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '5px',
    display: 'flex',
}));

export const ServiceBox = styled(Box)(({ theme }) => ({
    padding: '16px',
    backgroundColor: '#f0fff0',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
}));

export const ServiceTitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '12px',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
}));

export const ServiceTypography = styled(Typography)(({ theme }) => ({
    color: '#555',
    fontSize: '1.05rem',
    marginLeft: '16px',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    '& strong': {
        marginRight: '6px',
        color: '#333',
    },
    '& strong:last-child': {
        marginLeft: '6px',
        color: '#007bff',
    },
}));