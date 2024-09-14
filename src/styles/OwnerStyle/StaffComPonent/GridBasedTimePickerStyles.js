export const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export const gridBoxStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '10px',
    maxWidth: '600px',
    justifyItems: 'center',
    margin: '16px 0',
    width: '100%',
    '@media (max-width: 768px)': { 
        gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
    },
    '@media (max-width: 600px)': {  
        gridTemplateColumns: 'repeat(4, 1fr)',  
    },
    '@media (max-width: 400px)': {  // For very small screens
        gridTemplateColumns: 'repeat(3, 1fr)',  
    },
};

export const timeSlotStyle = {
    width: '80px',
    height: '45px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    '&:hover': {
        backgroundColor: '#E3F2FD',  
        transform: 'scale(1.05)',
    },
    '@media (max-width: 600px)': { 
        width: '70px',
        height: '40px',
    },
    '@media (max-width: 400px)': {  
        width: '60px',
        height: '35px',
    }
};

export const disabledSlotStyle = {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
};

export const selectedSlotStyle = {
    backgroundColor: '#64B5F6',  
    color: 'white',
    borderColor: '#2196F3',  
};

export const timeLabelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    '@media (max-width: 600px)': {  // Adjust font size for mobile
        fontSize: '12px',
    },
    '@media (max-width: 400px)': {  // Adjust font size for very small screens
        fontSize: '11px',
    },
};

export const firstClickStyle = {
    backgroundColor: '#BBDEFB',  // Very light blue for the first click
    border: '2px solid #BBDEFB',
    boxShadow: '0 0 5px rgba(187, 222, 251, 0.5)',  // Softer blue shadow
};