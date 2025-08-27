import { Paper, Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function StatCard({ icon, label, value, change, changeDir, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: 2.5,
        minHeight: 95,
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "0px 2px 16px rgba(80, 120, 220, 0.07)",
        bgcolor: "#fff"
      }}
    >
      <Box sx={{
        bgcolor: color + ".light",
        color: color + ".main",
        borderRadius: "50%",
        p: 1.2,
        display: "flex"
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="overline" sx={{ fontWeight: 700, fontSize: 13, color: "#555" }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
          {value}
        </Typography>
        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mt: 0.3 }}>
            {changeDir === 'up'
              ? <ArrowUpwardIcon color="success" fontSize="small" />
              : <ArrowDownwardIcon color="error" fontSize="small" />
            }
            <Typography variant="caption" color={changeDir === 'up' ? 'success.main' : 'error.main'}>
              {change}
            </Typography>
            <Typography variant="caption" sx={{ ml: 0.3, color: "#aaa" }}>
              Since last month
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}