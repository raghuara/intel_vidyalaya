import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectWebsiteSettings } from "../Redux/Slices/websiteSettingsSlice";
import Loader from "../Components/Loader";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import FolderIcon from "../Images/Icons/folder-information-outline.png";
import StudentIcon from "../Images/Icons/student-management-4 1.png";
import ChartIcon from "../Images/Icons/chart-timeline.png";
import CreditIcon from "../Images/Icons/credit-card-settings-outline.png";
import BusIcon from "../Images/Icons/bus-marker.png";
import SchoolIcon from "../Images/Icons/school-outline.png";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const items = [
    { color: "#E30053", icon: StudentIcon, text: "Admission Management", bgColor: "#FCF8F9", iconBgColor: "#fbebf1", path: '/dashboardmenu/soon', disabled: true },
    { color: "#8600BB", icon: FolderIcon, text: "Student Information", bgColor: "#FBF9FC", iconBgColor: "#F7F0F9", path: 'information', disabled: false },
    { color: "#FF0004", icon: ChartIcon, text: "Student Attendance", bgColor: "#FDF5F5", iconBgColor: "#FDE9E9", path: '/dashboardmenu/soon', disabled: true },
    { color: "#DA701A", icon: CreditIcon, text: "Student Fee & Finance", bgColor: "#FCF9F6", iconBgColor: "#FBF3ED", path: '/dashboardmenu/soon', disabled: true },
    { color: "#7DC353", icon: BusIcon, text: "Student Transport", bgColor: "#F9FBF7", iconBgColor: "#F2F8EE", path: '/dashboardmenu/soon', disabled: true },
    { color: "#E7C101", icon: SchoolIcon, text: "LMS", bgColor: "#FCFBF8", iconBgColor: "#FCF9EB", path: '/dashboardmenu/soon', disabled: true },
];

export default function StudentPage() {
    const [isLoading, setIsLoading] = useState(false);
    const websiteSettings = useSelector(selectWebsiteSettings);
    return (
        <Box sx={{ width: "100%", }}>
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", p: 1.5, borderRadius: "10px 10px 10px 0px", }}>
                <Grid container>
                    <Grid item xs={6} sm={6} md={3} lg={3} sx={{ display: "flex", alignItems: "center", }}>
                        <Link style={{ textDecoration: "none" }} to="/dashboardmenu/myprojects">
                            <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                                <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                        </Link>
                        <Typography sx={{ fontWeight: "600", fontSize: "20px", ml: 2 }} >Student Management</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box sx={{ p: 2, mt: 2 }}>
                    <Box sx={{ backgroundColor: "#fff", px: 2, borderRadius: "15px", height: { sm: "100%", lg: "80vh" } }}>
                        <Grid container spacing={2} >
                            {items.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "center", py: 6, mt: 1 }} key={index}>
                                    <Link
                                        to={item.disabled ? "#" : item.path}
                                        state={{ value: 'Y' }}
                                        style={{
                                            textDecoration: 'none',
                                            height: "60px",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: item.bgColor,
                                                width: "100%",
                                                height: "115px",
                                                borderRadius: "7px",
                                                cursor: item.disabled ? "not-allowed" : "pointer",
                                                opacity: item.disabled ? 0.5 : 1,
                                                '&:hover': {
                                                    '.arrowIcon': {
                                                        opacity: item.disabled ? 0 : 1,
                                                    },
                                                },
                                            }}
                                        >

                                            <Grid container spacing={1} sx={{ height: '100%', px: 2, }}>
                                                <Grid item md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Box sx={{
                                                        backgroundColor: item.iconBgColor,
                                                        borderRadius: "50px",
                                                        width: "25px",
                                                        height: "25px",
                                                        p: 1.3
                                                    }}>
                                                        <img src={item.icon} width={25} height={25} />
                                                    </Box>
                                                </Grid>
                                                <Grid item md={6} sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Typography sx={{ fontWeight: "600", color: "#000", pl:1 }}>
                                                        {item.text}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={3} sx={{
                                                    display: 'flex',
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    height: '100%'
                                                }}>
                                                    <ArrowForwardIcon className="arrowIcon" sx={{
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                        color: item.color,
                                                    }} />
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}