import { Autocomplete, Box, Button, Divider, Grid2, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { selectWebsiteSettings } from '../../../Redux/Slices/websiteSettingsSlice';
import { useSelector } from 'react-redux';
import { selectGrades } from '../../../Redux/Slices/DropdownController';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function FeeFinancePage() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");
    const websiteSettings = useSelector(selectWebsiteSettings);
    const grades = useSelector(selectGrades);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    const selectedGrade = grades.find((grade) => grade.id === selectedGradeId);
    const sections = selectedGrade?.sections.map((section) => ({ sectionName: section })) || [];


    useEffect(() => {
        if (grades && grades.length > 0) {
            setSelectedGradeId(grades[0].id);
            setSelectedSection(grades[0].sections[0]);
        }
    }, [grades]);

    const handleSectionChange = (event, newValue) => {
        setSelectedSection(newValue?.sectionName || null);
    };

    const handleGradeChange = (newValue) => {
        if (newValue) {
            setSelectedGradeId(newValue.id);
            setSelectedSection(newValue.sections[0]);
        } else {
            setSelectedGradeId(null);
            setSelectedSection(null);
        }
    };

    const handleCreateClick = () => {
        navigate("grade")
    }

    return (
        <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", p: 2, }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "20px", fontWeight: "600" }}> Fee Management </Typography>
                <Button sx={{ border: "1px solid #8600BB", color: "#8600BB", borderRadius: "30px", fontSize: "13px", height: "30px", textTransform: "none", fontWeight: "600" }}>Payment Summary</Button>
            </Box>
            <Divider sx={{ pt: 2 }} />
            <Grid2 container sx={{ py: 2, px: 1, mt: 1, backgroundColor: websiteSettings.backgroundColor }}>
                <Grid2 size={{ lg: 6, sm: 12, xs: 12 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search by Student Name or Roll Number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            sx: {
                                padding: "0 10px",
                                borderRadius: "50px",
                                height: "32px",
                                width: "300px",
                                fontSize: "12px",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                minHeight: "28px",
                                paddingRight: "3px",
                                backgroundColor: "#fff",
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: websiteSettings.mainColor,
                            },
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid2>
                <Grid2 size={{ lg: 6, sm: 12, xs: 12 }}>
                    <Grid2 container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                        <Grid2 size={{ lg: 3, sm: 12, xs: 12 }} sx={{ display: "flex", justifyContent: "end" }}>
                            <Typography>Select Class</Typography>
                        </Grid2>
                        <Grid2 size={{ lg: 4.5, sm: 12, xs: 12 }}>
                            <Autocomplete
                                disablePortal
                                options={grades}
                                getOptionLabel={(option) => option.sign}
                                value={grades.find((item) => item.id === selectedGradeId) || null}
                                onChange={(event, newValue) => {
                                    handleGradeChange(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                sx={{ width: "100%" }}
                                PaperComponent={(props) => (
                                    <Paper
                                        {...props}
                                        style={{
                                            ...props.style,
                                            maxHeight: "150px",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props} className="classdropdownOptions">
                                        {option.sign}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        placeholder="Select Class"
                                        {...params}
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            sx: {
                                                paddingRight: 0,
                                                height: "33px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={{ lg: 4.5, sm: 12, xs: 12 }}>
                            <Autocomplete
                                disablePortal
                                options={sections}
                                getOptionLabel={(option) => option.sectionName}
                                value={
                                    sections.find((option) => option.sectionName === selectedSection) ||
                                    null
                                }
                                onChange={handleSectionChange}
                                isOptionEqualToValue={(option, value) =>
                                    option.sectionName === value.sectionName
                                }
                                sx={{ width: "100%" }}
                                PaperComponent={(props) => (
                                    <Paper
                                        {...props}
                                        style={{
                                            ...props.style,
                                            maxHeight: "150px",
                                            backgroundColor: "#000",
                                            color: "#fff",
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <li {...props} className="classdropdownOptions">
                                        {option.sectionName}
                                    </li>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        InputProps={{
                                            ...params.InputProps,
                                            sx: {
                                                paddingRight: 0,
                                                height: "33px",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography><span style={{ fontWeight: "600" }}> No data available</span>.</Typography>
                    <Typography> Please select a class and section,</Typography>
                    <Typography> or create a new fee record to get started.</Typography>
                    <Button
                        variant="outlined"
                        onClick={handleCreateClick}
                        sx={{
                            borderColor: "#A9A9A9",
                            backgroundColor: "#000",
                            py: 0.3,
                            mt: 2,
                            width: "170px",
                            height: "30px",
                            color: "#fff",
                            textTransform: "none",
                            border: "none",

                        }}
                    >
                        <AddIcon sx={{ fontSize: "20px" }} />
                        &nbsp;Create new fee
                    </Button>

                </Box>
            </Box>

        </Box>
    )
}
