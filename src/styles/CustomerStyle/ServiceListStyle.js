import { styled, keyframes } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

// Keyframes for snow animation
const snowFall = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100px); opacity: 0; }
`;

// SnowLayer for falling snowflakes
export const SnowLayer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none', // Snowflakes shouldn't block interactions
  zIndex: 0, // Behind the text and content
  overflow: 'hidden',
  '& .snowflake': {
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: '#ffffff',
    borderRadius: '50%',
    animation: `${snowFall} 4s linear infinite`,
    animationDelay: 'calc(val(--index) * 0.2s)',
    opacity: 1.2,
  },
});

// Styled CategoryHeader with snow cap
export const CategoryHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.2, 3),
  margin: theme.spacing(0, 1),
  background: '#ff4d4f', // Light red background
  borderRadius: '12px',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  border: '1.5px solid #d32f2f', // Rich festive red border
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow
  position: 'relative', // Needed for snow cap and snowflakes
  overflow: 'hidden', // Prevent snowflakes from overflowing
  '&:hover': {
    background: 'linear-gradient(to right, #e53935, #ff4f4f)', // Slightly darker hover effect
    border: '1.5px solid #b71c1c',
    borderRadius: '12px',
  },
  '&:active': {
    borderRadius: '16px',
    background: 'linear-gradient(to right, #d32f2f, #ff3d3d)', // Slightly darker on click
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 3),
  },

  // Snow cap on top
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20px',
    background: '#ffffff', // White snow color
    borderRadius: '12px 12px 0 0', // Rounded snow edges
    clipPath: 'polygon(0% 55%, 10% 60%, 25% 50%, 40% 65%, 60% 45%, 75% 70%, 90% 55%, 100% 65%, 100% 0%, 0% 0%)', // Wavy snow effect
    zIndex: 1, // Above the header
  },
}));

export const ServiceItem = styled(Paper)(({ theme, selected }) => ({
    padding: theme.spacing(1.2, 3),
    background: selected ? '#ffe0e5' : '#FFFFFF', 
    borderRadius: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    maxWidth: '85%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    margin: theme.spacing(1, 'auto'),
    border: selected ? '2.3px solid #ffe0e5' : '1.8px solid #ffe0e5', 
    boxShadow: 'none',
    '&:hover': {
        borderRadius: '12px',
        boxShadow: 'none', 
    },
    '&:active': {
        borderRadius: '12px',
        boxShadow: 'none', 
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5, 3),
        '&:hover': {
            borderRadius: '12px',
            boxShadow: 'none', 
        },
        '&:active': {
            borderRadius: '12px',
            boxShadow: 'none', 
        },
    },
}));

export const CategoryText = styled(Typography)(({ theme }) => ({
    color: 'white', // Corrected the typo here
    fontSize: '1.4rem',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

export const ServiceTextBlack = styled(Typography)(({ theme }) => ({
    color: 'black', // Corrected the typo here
    fontSize: '1.4rem',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

export const ServiceText = styled(Typography)(({ theme }) => ({
    color: '#555',
    fontSize: '1rem',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}));

export const ServiceListContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

export const ExpandIcon = styled('div')(({ theme, expanded }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: expanded ? '#FFB3B3' : '#FFD7D7',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
}));