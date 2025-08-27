import React, { useState, useMemo } from 'react';
import {
    Button, Dialog, DialogContent, MenuItem, Select, List, ListItem, Box, Typography, Paper
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { getWeeksOfYear } from '../../../utils/dateRange';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    DialogTitleStyled,
    CloseIconButtonStyled,
} from '../../../styles/CalculateMoney/AssignmentCustomerModalStyles';
import {
    weekPickerBtn,
    weekPickerDialogContent,
    weekPickerHeaderBox,
    weekPickerYearSelect,
    weekPickerListBox,
    weekPickerPaper,
    weekPickerListItem,
    weekPickerListWeekText,
    weekPickerListDateText,
    weekPickerChevron,
    searchBarInputProps,
    searchBarSx,
    searchBarIcon
} from '../../../styles/CalculateMoney/Pickers/WeekPickerStyles';

const WeekPickerSearchBar = ({ value, onChange, placeholder = "Search week number" }) => (
    <TextField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="small"
        variant="outlined"
        fullWidth
        InputProps={{
            ...searchBarInputProps,
            endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon sx={searchBarIcon} />
                </InputAdornment>
            ),
        }}
        sx={searchBarSx}
    />
);

export default function WeekPicker({ value, year, onChange }) {
    const [open, setOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(year || new Date().getFullYear());
    const [searchQuery, setSearchQuery] = useState('');
    const weeks = getWeeksOfYear(selectedYear);

    const filteredWeeks = useMemo(() => {
        const query = searchQuery.trim();
        if (!query) return weeks;
        return weeks.filter(w => String(w.week).includes(query));
    }, [weeks, searchQuery]);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                sx={weekPickerBtn}
            >
                {value
                    ? `Week ${value} (${weeks[value - 1]?.start} to ${weeks[value - 1]?.end})`
                    : "Pick a Week"}
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitleStyled>
                    Pick a Year and Week
                    <CloseIconButtonStyled aria-label="close" onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </CloseIconButtonStyled>
                </DialogTitleStyled>
                <DialogContent sx={weekPickerDialogContent}>
                    <Box sx={weekPickerHeaderBox}>
                        <Select
                            value={selectedYear}
                            onChange={e => setSelectedYear(Number(e.target.value))}
                            fullWidth
                            sx={weekPickerYearSelect}
                            size="small"
                        >
                            {Array.from({ length: 10 }, (_, i) => {
                                const y = new Date().getFullYear() - 9 + i;
                                return <MenuItem key={y} value={y}>{y}</MenuItem>;
                            })}
                        </Select>
                        <WeekPickerSearchBar
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Search Week"
                        />
                    </Box>
                    <Box sx={weekPickerListBox}>
                        <List dense sx={{ p: 0 }}>
                            {filteredWeeks.length === 0 && (
                                <Typography sx={{ color: "#aaa", p: 2, textAlign: "center" }}>
                                    No weeks found.
                                </Typography>
                            )}
                            {filteredWeeks.map((w, i) => (
                                <Paper
                                    key={w.week}
                                    elevation={value === w.week && selectedYear === year ? 6 : 2}
                                    sx={weekPickerPaper(value === w.week && selectedYear === year)}
                                    onClick={() => {
                                        onChange(selectedYear, w.week);
                                        setOpen(false);
                                    }}
                                >
                                    <ListItem sx={weekPickerListItem}>
                                        <Box>
                                            <Typography sx={weekPickerListWeekText}>
                                                Week {w.week}
                                            </Typography>
                                            <Typography sx={weekPickerListDateText}>
                                                {w.start} to {w.end}
                                            </Typography>
                                        </Box>
                                        <ChevronRightIcon sx={weekPickerChevron} />
                                    </ListItem>
                                </Paper>
                            ))}
                        </List>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}