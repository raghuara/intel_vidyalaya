import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../Redux/Slices/websiteSettingsSlice";
import Loader from "../Loader";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import NewsIcon from "../../Images/Icons/newspaper-check.png";
import MessagesIcon from "../../Images/Icons/message.png";
import CircularsIcon from "../../Images/Icons/circulars.png";
import HomeWorkIcon from "../../Images/Icons/class-homework 1.png";
import { Link, Navigate } from "react-router-dom";
import { ApprovalStatusCircularFetch, ApprovalStatusHomeWorkFetch, ApprovalStatusMessageFetch, ApprovalStatusNewsFetch } from "../../Api/Api";
import axios from "axios";

export default function ApprovalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [newsIntimation, setNewsIntimation] = useState(false);
    const [messageIntimation, setMessageIntimation] = useState(false);
    const [circularIntimation, setCircularIntimation] = useState(false);
    const [homeworkIntimation, setHomeworkIntimation] = useState(false);
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const websiteSettings = useSelector(selectWebsiteSettings);
    const token = "123"

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetchApprovalData(ApprovalStatusNewsFetch, setNewsIntimation),
            fetchApprovalData(ApprovalStatusMessageFetch, setMessageIntimation),
            fetchApprovalData(ApprovalStatusCircularFetch, setCircularIntimation),
            fetchApprovalData(ApprovalStatusHomeWorkFetch, setHomeworkIntimation),
        ]).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const fetchApprovalData = async (endpoint, setIntimation) => {
        try {
            const res = await axios.get(endpoint, {
                params: {
                    RollNumber: rollNumber,
                    UserType: userType,
                    Screen: "approver",
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const postData = res.data.post || [];
            const scheduleData = res.data.schedule || [];

            setIntimation(!(postData.length === 0 && scheduleData.length === 0));
        } catch (error) {
            console.error(`Error fetching approval from ${endpoint}`, error);
        }
    };

    const items = [
        { color: "#A749CC", icon: NewsIcon, text: "News", bgColor: "#FBF9FC", iconBgColor: "#F7F0F9", path: 'news', intimation: newsIntimation },
        { color: "#ED9146", icon: MessagesIcon, text: "Messages", bgColor: "#FCFBF9", iconBgColor: "#FBF4EF", path: 'messages', intimation: messageIntimation },
        { color: "#7DC353", icon: CircularsIcon, text: "Circulars", bgColor: "#F9FBF7", iconBgColor: "#F2F8EE", path: 'circulars', intimation: circularIntimation },
        { color: "#E10052", icon: HomeWorkIcon, text: "Homework", bgColor: "#FCF8F9", iconBgColor: "#FBEBF1", path: 'homework', intimation: homeworkIntimation },
    ];

    if (userType !== "superadmin" && userType !== "admin") {
        return <Navigate to="/dashboardmenu/dashboard" replace />;
    }

    return (
        <Box sx={{ width: "100%", }}>
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", p: 1.5, borderRadius: "10px 10px 10px 0px", borderBottom: "1px solid #ddd", }}>
                <Grid container>
                    <Grid item xs={6} sm={6} md={3} lg={3} sx={{ display: "flex", alignItems: "center", }}>

                        <Typography sx={{ fontWeight: "600", fontSize: "20px", ml: 2 }} >Approvals</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box sx={{ p: 2, mt: 2 }}>
                    <Box sx={{ backgroundColor: "#fff", px: 2, py: 2.5, borderRadius: "15px", display: "flex", justifyContent: "center", height: "70vh", overflowY: "auto" }}>
                        <Grid container spacing={2} >
                            {items.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }} key={index}>
                                    <Link
                                        to={item.path}
                                        state={{ value: 'N' }}
                                        style={{
                                            textDecoration: 'none',
                                            height: "60px",
                                            width: "100%",
                                        }}
                                    >
                                        <Box sx={{ width: "20px", height: "20px", backgroundColor: "black", position: "absolute" }} />
                                        <Box
                                            sx={{
                                                position: "relative",
                                                backgroundColor: item.bgColor,
                                                width: "100%",
                                                height: "115px",
                                                borderRadius: "7px",
                                                cursor: "pointer",
                                                '&:hover': {
                                                    '.arrowIcon': {
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        >
                                            {
                                                (item.text === "News" && newsIntimation) ||
                                                    (item.text === "Messages" && messageIntimation) ||
                                                    (item.text === "Homework" && homeworkIntimation) ||
                                                    (item.text === "Circulars" && circularIntimation) ? (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: "-4px",
                                                            right: "-4px",
                                                            width: "12px",
                                                            height: "12px",
                                                            backgroundColor: "#f00",
                                                            borderRadius: "50%",
                                                            zIndex: 1,
                                                            border: "2px solid #fff",
                                                        }}
                                                    />
                                                ) : null}

                                            <Grid container spacing={1} sx={{ height: '100%', px: 2, }}>
                                                <Grid item md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                                <Grid item md={7} sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Typography sx={{ fontWeight: "600", color: "#000" }}>
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