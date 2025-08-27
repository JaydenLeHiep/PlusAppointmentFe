export const boxStyle = {
  p: { xs: 1, md: 2 }
};

export const stackStyle = {
  mb: 3,
  alignItems: "center"
};

export const formControlPeriodStyle = {
  minWidth: 180
};

export const formControlMonthStyle = {
  minWidth: 100,
  borderRadius: 2,
  bgcolor: "#f6f8fb",
  boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
};

export const formControlYearStyle = {
  minWidth: 100,
  borderRadius: 2,
  bgcolor: "#f6f8fb",
  boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
};

export const yearSelectSx = {
  fontWeight: 600
};

export const loadingBoxStyle = {
  py: 8,
  textAlign: 'center'
};

export const weekPickerBoxStyle = {
  height: 40,
  display: "flex",
  alignItems: "center"
};

export const textFieldDayStyle = {
  minWidth: 180
};

export const transitionProps = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.5, ease: 'easeInOut' }
};