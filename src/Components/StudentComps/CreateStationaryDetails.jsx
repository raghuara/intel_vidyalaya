import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../Redux/Slices/websiteSettingsSlice";
import Loader from "../Loader";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import NewsIcon from "../../Images/Icons/newspaper-check.png";
import MessagesIcon from "../../Images/Icons/message.png";
import CircularsIcon from "../../Images/Icons/circulars.png";
import ConsentFormIcon from "../../Images/Icons/consent.png";
import TimeTableIcon from "../../Images/Icons/timetable.png";
import HomeWorkIcon from "../../Images/Icons/class-homework 1.png";
import ExamIcon from "../../Images/Icons//class-homework 2.png";
import StudyIcon from "../../Images/Icons/book-open-variant-outline.png";
import MarksIcon from "../../Images/Icons/result-audit (1) 1.png";
import CalendarIcon from "../../Images/Icons/calendar-check-outline.png";
import EventsIcon from "../../Images/Icons/microphone-variant.png";
import FeedbackIcon from "../../Images/Icons/comment-quote-outline.png";
import AttendanceIcon from "../../Images/Icons/chart-timeline-variant-shimmer.png";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function CreateStationaryDetailsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const websiteSettings = useSelector(selectWebsiteSettings);

    return (
        <Box sx={{ width: "100%", }}>
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", p: 1.5, borderRadius: "10px 10px 10px 0px", }}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", alignItems: "center", }}>
                        <Link style={{ textDecoration: "none" }} to="/dashboardmenu/myprojects">
                            <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                                <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                        </Link>
                        <Typography sx={{ fontWeight: "600", fontSize: "20px", ml: 2 }} >Create Stationary Details</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box sx={{ p: 1 }}>
                    <Box sx={{ backgroundColor: "#fff", p: 1.5, borderRadius: "15px", height: "78.6vh", overflowY: "auto", border: "1px solid #CFCFCF", }}>
                        <Typography sx={{ fontSize: "14px", color: "#8600BB" }}>
                            Stationary For : <span style={{ fontWeight: "600" }}> UKG </span>
                        </Typography>
                        <Box sx={{ width: "100%", borderTop: "1px solid #CFCFCF", mt: 0.5 }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
