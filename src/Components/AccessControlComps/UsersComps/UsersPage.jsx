import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import SnackBar from "../../SnackBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import { useSelector } from "react-redux";
import { LoginList } from "../../../Api/Api";
import axios from "axios";
import * as XLSX from 'xlsx';

export default function UsersPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [loginStudentDetails, setLoginStudentDetails] = useState([]);
    const [loginOthersDetails, setLoginOthersDetails] = useState([]);
    const token = "123"
    const websiteSettings = useSelector(selectWebsiteSettings);

    useEffect(() => {
        fetcDetails()
    }, [])

    const fetcDetails = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(LoginList, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoginStudentDetails(res.data.studentData)
            setLoginOthersDetails(res.data.othersDate)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


const handleExport = () => {
    const header = [
        'S.No', 'Roll Number', 'Name', 'User Type', 'Class', 'Section'
    ];

    const combinedData = [...loginStudentDetails, ...loginOthersDetails];

    const data = combinedData.map((row, index) => [
        index + 1,
        row.rollNumber || '',
        row.name || '',
        row.userType || '',
        row.grade || '',
        row.section || ''
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, 'logged_in_users.xlsx');
};

    return (
        <Box sx={{ width: "100%", }}>
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", px: 2, borderRadius: "10px 10px 10px 0px", borderBottom: "1px solid #ddd", }}>
                <Grid2 container>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ display: "flex", alignItems: "center", py: 1.5 }}>
                        <Link style={{ textDecoration: "none" }} to="/dashboardmenu/access">
                            <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                                <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                        </Link>
                        <Typography sx={{ fontWeight: "600", fontSize: "20px" }} >Users Details</Typography>
                    </Grid2>
                </Grid2>
            </Box>
            <Box sx={{ display: "flex", height: "80vh" }}>
                <Box sx={{ px: 8, py: 8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 1 }}>
                    Member Download Report - See Who's Using SchoolMate
                    </Typography>

                    <Typography sx={{ fontSize: "14px", color: "#666", mb: 2 }}>
                    Effortlessly view detailed records of users who have downloaded the SchoolMate app, including names, roll numbers, and class sections.
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                        <Button
                        onClick={handleExport}
                            variant="contained"
                            sx={{
                                backgroundColor: websiteSettings.mainColor,
                                color: websiteSettings.textColor,
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1,
                                borderRadius: "8px",
                                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                                '&:hover': {
                                    backgroundColor: websiteSettings.mainColor,
                                    opacity: 0.9
                                }
                            }}
                        >
                            Export
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}