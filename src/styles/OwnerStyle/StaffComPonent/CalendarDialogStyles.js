export const dialogTitleStyle = {
    fontWeight: '550',
    fontSize: '1.75rem',
    color: '#1a1a1a',
    textAlign: 'center',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '3px',
  };
  
  export const closeIconButtonStyle = {
    color: '#808080',
    fontSize: '1.5rem',
  };
  
  export const alertStyle = {
    mt: 2,
  };
  
  export const addNewDateTypographyStyle = {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#1976d2',
    '&:hover': {
      color: '#115293',
    },
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };
  
  export const listItemStyle = {
    borderRadius: '8px',
    backgroundColor: '#f0f8ff',
    mb: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid #1976d2',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#e6f1ff',
    },
  };
  
  export const iconButtonStyle = {
    padding: '4px',
    marginRight: '8px',
  };
  
  export const editButtonStyle = {
    ...iconButtonStyle,
  };
  
  export const deleteButtonStyle = {
    padding: '4px',
  };
  
  export const buttonStyle = {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: 'auto',
    height: '40px',
    boxSizing: 'border-box',
  };
  
  export const addOrUpdateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
  };
  
  export const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };
  
  export const inlineCalendarBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
  };
  
  export const dateRangePickerStyle = {
    width: '100%',  
    maxWidth: '320px', 
    margin: '0 auto', 
  };