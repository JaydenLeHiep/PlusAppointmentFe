export const weekPickerBtn = {
    height: 40,
    textTransform: "none",
    fontWeight: 600
};

export const weekPickerDialogContent = {
    p: 0, bgcolor: "#fff", borderRadius: 3
};

export const weekPickerHeaderBox = {
    display: 'flex',
    gap: 2,
    px: 3,
    pt: 2,
    pb: 1,
    bgcolor: "#fff"
};

export const weekPickerYearSelect = {
    bgcolor: "#f6f8fb",
    boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
    flex: 1
};

export const weekPickerSearchBar = {
    flex: 1,
    minWidth: 0
};

export const weekPickerListBox = {
    px: 2,
    py: 2,
    overflow: 'auto',
    maxHeight: 350,
    bgcolor: "#fff"
};

export const weekPickerPaper = (selected) => ({
    mb: 2,
    bgcolor: selected ? "#e3f0fd" : "#fafbff",
    border: selected
        ? "2px solid #1976d2"
        : "1.5px solid #e3e7ef",
    boxShadow: selected
        ? "0px 0px 0px 0px #1976d248"
        : "0px 0px 0px 0px #e6eaf19d",
    '&:hover': {
        bgcolor: "#f1f6fd",
        border: "2px solid #1976d2",
        cursor: 'pointer',
        boxShadow: "0px 12px 32px 0px #1976d230"
    },
});

export const weekPickerListItem = {
    p: 2,
    alignItems: "flex-start",
    gap: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
};

export const weekPickerListWeekText = {
    fontWeight: 800,
    fontSize: "1.12rem",
    color: "#1976d2"
};

export const weekPickerListDateText = {
    color: "#5d6472",
    fontWeight: 500,
    fontSize: 14,
    mt: 0.2
};

export const weekPickerChevron = {
    color: "#b0b9cc",
    mt: 0.5,
    fontSize: 28,
    opacity: 0.7
};

export const searchBarSx = {
    bgcolor: "#f6f8fb",
    boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
    height: 40,
    fontSize: 16,
    flex: 1,
    '& .MuiOutlinedInput-root': {
        bgcolor: "#f6f8fb",
        height: 40,
    },
    '& .MuiInputBase-input': {
        fontSize: 16,
        pt: 1,
        pb: 1,
    },
};

export const searchBarInputProps = {
    sx: {
        bgcolor: "#f6f8fb",
        height: 40,
        fontSize: 16,
        flex: 1,
    }
};

export const searchBarIcon = {
    color: '#1976d2',
};