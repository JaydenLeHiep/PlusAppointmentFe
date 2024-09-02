export const formBoxStyles = {
    mt: 2,
    p: 2,
    mb: 3,
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
  };
  
  export const iconButtonStyles = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    color: '#6c757d',
  };
  
  export const typographyStyles = {
    mb: 2,
    fontWeight: 'bold',
  };
  
  export const textFieldStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  };
  
  export const cancelButtonStyles = {
    width: '120px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '#6c757d',
    color: '#fff',
    '&:hover': { backgroundColor: '#5a6268' },
  };
  
  export const actionButtonStyles = {
    width: '150px',
    height: '40px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    color: '#fff',
    '&:hover': { backgroundColor: '#0056b3' }, // Default hover color, can be overridden
    '&.Mui-disabled': { backgroundColor: '#ccc' },
  };