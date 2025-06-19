import { Autocomplete, Box, Button, Divider, Grid2, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { selectWebsiteSettings } from '../../../Redux/Slices/websiteSettingsSlice';
import { useSelector } from 'react-redux';
import { selectGrades } from '../../../Redux/Slices/DropdownController';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditIcon from "@mui/icons-material/Edit";

export default function CreateFeePage() {
    const navigate = useNavigate()
    const websiteSettings = useSelector(selectWebsiteSettings);
    const grades = useSelector(selectGrades);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const location = useLocation();
    const { grade, gradeId } = location.state || {};

    const selectedGrade = grades.find((grade) => grade.id === selectedGradeId);
    const sections = selectedGrade?.sections.map((section) => ({ sectionName: section })) || [];
    const feeItems = [
        { name: "Admission Fee", amount: 5000 },
        { name: "Notebook & Supplies Fee", amount: 15000 },
        { name: "Term Fee 1", amount: 5000 },
        { name: "Term Fee 2", amount: 5000 },
        { name: "Term Fee 3", amount: 5000 },
        { name: "Late Fee", amount: 100 },
    ];
    const [fees, setFees] = useState(feeItems);
    const [dateRanges, setDateRanges] = useState(Array(feeItems.length).fill([null, null]));

    const handleAmountChange = (index, value) => {
        const updated = [...fees];
        updated[index].amount = value;
        setFees(updated);
    };

    useEffect(() => {
        if (grades && grades.length > 0) {
            setSelectedGradeId(grades[0].id);
            setSelectedSection(grades[0].sections[0]);
        }
    }, [grades]);

    return (
        <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", p: 2, }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex" }}>
                    <Link to={"/dashboardmenu/student/fee/categories"}>
                        <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                            <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                        </IconButton>
                    </Link>
                    <Typography sx={{ fontSize: "20px", fontWeight: "600" }}> Set Fee Structure </Typography>
                </Box>
            </Box>
            <Divider sx={{ pt: 2 }} />
            <Box sx={{ border: "1px solid #ccc", borderRadius: "20px", height: "69vh", overflowY: "auto", mt: 2, p: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ backgroundColor: "#8600BB", color: "#fff", width: "160px", fontSize: "14px", fontWeight: "600", borderRadius: "5px 5px 0px 0px", height: "25px", display: "flex", justifyContent: "center", alignItems: "center", ml: 2 }}>Tuition & Other Fees</Box>
                    <TableContainer sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.0)", border: "1px solid #ccc" }} component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#F8EFFC" }}>
                                    {["Fee Details", "Fee Amount", "Click to add due date", "Total Fee Amount", "Edit"].map((head, idx) => (
                                        <TableCell
                                            key={idx}
                                            sx={{ border: "1px dotted #ccc", fontWeight: "bold", textAlign: "center", padding: "8px" }}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fees.map((fee, index) => {
                                    const [from, to] = dateRanges[index];
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: "1px dotted #ccc", pl: 2, py: 0.7 }}>{fee.name}</TableCell>
                                            <TableCell sx={{ border: "1px dotted #ccc", pl: 2, py: 0.7, display: "flex", justifyContent: "center" }}>
                                                <TextField
                                                    value={fee.amount}
                                                    onChange={(e) => handleAmountChange(index, e.target.value)}
                                                    InputProps={{
                                                        startAdornment: <span style={{ marginRight: 5 }}>₹</span>,
                                                    }}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell sx={{ border: "1px dotted #ccc" }}>
                                            </TableCell>
                                            <TableCell sx={{ border: "1px dotted #ccc", pl: 2, py: 0.7, textAlign: "center" }}>
                                                <b>Rs.{fee.amount}</b>
                                            </TableCell>
                                            <TableCell sx={{ border: "1px dotted #ccc", pl: 2, py: 0.7, textAlign: "center" }}>
                                                <IconButton>
                                                    <EditIcon sx={{ fontSize: "18px" }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3} />
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "green" }}>
                                        Total Amount
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "green" }}>
                                        Rs.{fees.reduce((total, fee) => total + Number(fee.amount || 0), 0).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </LocalizationProvider>

                <Box sx={{display:"flex", justifyContent:"center", mt:3}}>
                    <Button sx={{
                        color: "black",
                        textDecoration: "underline",
                        height:"25px",
                        textTransform: "none",
                    }}>Save Fee Structure</Button>

                    <Button sx={{
                        color: "black",
                        border:"1px solid black", 
                        height:"25px",
                        width:"100px",
                        mx:2,
                        textTransform: "none",
                        borderRadius:"30px"
                    }}>Reset All</Button>

                    <Button  sx={{
                        backgroundColor:websiteSettings.mainColor,
                        color:websiteSettings.textColor,
                        textTransform: "none",
                        borderRadius:"30px",
                        height:"25px",
                    }}>Submit for Approval</Button>
                </Box>
            </Box>
        </Box>
    )
}
