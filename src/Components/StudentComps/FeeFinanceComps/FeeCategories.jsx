import { Autocomplete, Box, Button, Divider, Grid2, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { selectWebsiteSettings } from '../../../Redux/Slices/websiteSettingsSlice';
import { useSelector } from 'react-redux';
import { selectGrades } from '../../../Redux/Slices/DropdownController';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FeeCategories() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");
    const websiteSettings = useSelector(selectWebsiteSettings);
    const grades = useSelector(selectGrades);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const location = useLocation();
    const { grade, gradeId } = location.state || {};

    const selectedGrade = grades.find((grade) => grade.id === selectedGradeId);
    const sections = selectedGrade?.sections.map((section) => ({ sectionName: section })) || [];


    const categories = [
        "Tuition Fee",
        "Exam Fee",
        "Transport Fee",
        "Library Fee",
        "Hostel & Mess Fee",
        "Lab Fee",
        "Sports & Extracurricular Fee"
    ]

    useEffect(() => {
        if (grades && grades.length > 0) {
            setSelectedGradeId(grades[0].id);
            setSelectedSection(grades[0].sections[0]);
        }
    }, [grades]);


    const handleCategoryClick = () => {
        navigate("/dashboardmenu/student/fee/create", {state : {grade, gradeId}})
    }

    return (
        <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", p: 2, }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                    <Link to={"/dashboardmenu/student/fee/grade"}>
                        <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                            <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                        </IconButton>
                    </Link>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}> Set Fee Structure for Students </Typography>
                </Box>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: "#A9A9A9",
                        backgroundColor: "#000",
                        py: 0.3,
                        width: "170px",
                        height: "30px",
                        color: "#fff",
                        textTransform: "none",
                        border: "none",

                    }}
                >
                    <AddIcon sx={{ fontSize: "20px" }} />
                    &nbsp;Stationery Fee
                </Button>
            </Box>
            <Divider sx={{ pt: 2 }} />
            <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", height: "73vh", overflowY:"auto", mt: 2, p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ backgroundColor: "#8600BB", color: "#fff", fontSize: "14px", pl: 1, pr: 4, py: 0.2, borderRadius: "0px 5px 5px 0px" }}>
                        {grade}
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            border: "1px solid black",
                            py: 0.3,
                            width: "80px",
                            height: "24px",
                            color: "#000",
                            textTransform: "none",

                        }}
                    >
                        <AddIcon sx={{ fontSize: "18px" }} />
                        &nbsp;Table
                    </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                    {categories.map((item, index) => (
                        <Box
                            key={index}
                            onClick={handleCategoryClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "linear-gradient(to bottom, #F4ECF7, #F1E5F6)",
                                p: 2,
                                borderRadius: "5px",
                                mb: 1,
                                cursor:"pointer"
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>{item}</Typography>
                            <Box
                                sx={{
                                    backgroundColor: "#E9D6F2",
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <AddIcon sx={{ fontSize: "20px" }} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>
    )
}
