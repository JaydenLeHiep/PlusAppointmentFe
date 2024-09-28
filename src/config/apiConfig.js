const getApiBaseUrl = () => {
    // Check if running in Android Emulator
    if (window.location.hostname === '10.0.2.2') {
      return 'http://10.0.2.2:8080';
    }
    // Default to localhost for other environments
    return process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
  };
  
  export const apiBaseUrl = getApiBaseUrl();