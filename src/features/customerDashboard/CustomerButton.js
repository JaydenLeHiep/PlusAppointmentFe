
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  backgroundColor: 'pink', // Set background color to pink
  color: 'white', // Set text color to white
  padding: '12px 24px', // Adjust padding as needed
  fontSize: '18px', // Adjust font size as needed
  '&:hover': {
    backgroundColor: '#ff4081', // Darker pink on hover (optional)
  },
});

export default CustomButton;
