import { Box, Table, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const RootContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '500px',
});

export const ScrollableListContainer = styled(Box)({
  maxHeight: '500px',
  overflowY: 'auto',
  padding: '8px',
});

export const StyledTableContainer = styled(TableContainer)({
  maxHeight: '500px',
  overflowY: 'auto',
});

export const StyledTable = styled(Table)({
  width: '100%',
});