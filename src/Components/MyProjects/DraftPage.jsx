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
import { Link, Navigate, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




// const items = [
//     { color: "#A749CC", icon: NewsIcon, text: "News", bgColor: "#A749CC1A", iconBgColor: "#F7F0F9", path: 'news', },
//     { color: "#ED9146", icon: MessagesIcon, text: "Messages", bgColor: "#ED91461A", iconBgColor: "#FBF4EF", path: 'messages' },
//     { color: "#7DC353", icon: CircularsIcon, text: "Circulars", bgColor: "#7DC3531A", iconBgColor: "#F2F8EE", path: 'circulars' },
//     { color: "#F44336", icon: ConsentFormIcon, text: "Consent Forms", bgColor: "#F443361A", iconBgColor: "#FAF0EC", path: 'consentforms' },
//     { color: "#073274", icon: MarksIcon, text: "Marks / Results", bgColor: "#0732741A", iconBgColor: "#ECEEF3", path: 'marks' },
//     { color: "#F44336", icon: FeedbackIcon, text: "Feedback", bgColor: "#F443361A", iconBgColor: "#FAF0EC", path: 'feedback' },
// ];


export default function DraftPage() {
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(0);
    const websiteSettings = useSelector(selectWebsiteSettings);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (path) => {
        navigate(path);
    };
    const filteredItems = [
        { color: "#A749CC", icon: NewsIcon, text: "News", bgColor: "#FBF9FC", iconBgColor: "#F7F0F9", path: 'news', },
        { color: "#ED9146", icon: MessagesIcon, text: "Messages", bgColor: "#FCFBF9", iconBgColor: "#FBF4EF", path: 'messages' },
        { color: "#7DC353", icon: CircularsIcon, text: "Circulars", bgColor: "#F9FBF7", iconBgColor: "#F2F8EE", path: 'circulars' },
        { color: "#F44336", icon: ConsentFormIcon, text: "Consent Forms", bgColor: "#FCF9F8", iconBgColor: "#FAF0EC", path: 'consentforms' },
        // { color: "#073274", icon: MarksIcon, text: "Marks / Results", bgColor: "#F8F9FA", iconBgColor: "#ECEEF3", path: 'marks' },
        // { color: "#F44336", icon: FeedbackIcon, text: "Feedback", bgColor: "#FCF9F8", iconBgColor: "#FAF0EC", path: 'feedback' },
    ];
    
    // const filteredItems = userType === "teacher"
    // ? items.filter(item => item.text === "Marks / Results")
    // : items;

    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/dashboard" replace />;
    }
    return (
        <Box sx={{ width: "100%", }}>
            {isLoading && <Loader />}
            <Box sx={{ backgroundColor: "#f2f2f2", p:1,  borderBottom:"1px solid #ddd", }}>
                <Grid container>
                    <Grid item xs={6} sm={6} md={3} lg={3} sx={{ display: "flex", alignItems: "center", }}>
                    <Link style={{ textDecoration: "none" }} to="/dashboardmenu/myprojects">
                            <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                                <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                        </Link>
                        <Typography sx={{ fontWeight: "600", fontSize: "20px", ml: 2 }} >Draft</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="attendance tabs"
                            variant="scrollable"
                            TabIndicatorProps={{
                                sx: { display: 'none' },
                            }}
                            sx={{
                                backgroundColor: '#fff',
                                minHeight: "10px",
                                borderRadius: "50px",
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontSize: '12px',
                                    color: '#555',
                                    fontWeight: 'bold',
                                    minWidth: 0,
                                    paddingX: 1,
                                    minHeight: '30px',
                                    height: '30px',
                                    p: 2,
                                    m: 0.8
                                },
                                '& .Mui-selected': {
                                    color: `${websiteSettings.textColor} !important`,
                                    bgcolor: websiteSettings.mainColor,
                                    borderRadius: "50px",
                                },
                            }}
                        >
                            <Tab label="Communication" />
                            <Tab label="Transport" />
                            <Tab label="ERP" />
                            <Tab label="Accademic" />
                        </Tabs>
                    </Grid>
                   
                </Grid>
            </Box>
            
            <Box>
                <Box hidden={value !== 0} sx={{ p: 2, }}>
                    <Box sx={{ backgroundColor: "#fff",  px: 2, pb:1, pt:3, borderRadius: "15px", height:"74vh" }}>
                        <Grid container spacing={2} >
                            {filteredItems.map((item, index) => (
                                  <Grid item xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }} key={index}>
                                  <Box
                                      onClick={() => handleClick(item.path)}
                                      style={{
                                          textDecoration: 'none',
                                          
                                          height: "115px",
                                          width: "100%",
                                      }}
                                  >
                                      <Box
                                          sx={{
                                              backgroundColor: item.bgColor,
                                              boxShadow:"1px 1px 2px 0.5px rgba(0, 0, 0, 0.2)",
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
                                          <Grid container spacing={1} sx={{ height: '100%',px:2, }}>
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
                                  </Box>
                              </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>


                <Box hidden={value !== 1}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "77vh",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "700",
                                color: "#2C3E50",
                                mb: 2,
                            }}
                        >
                            Coming Soon
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "16px",
                                color: "#7F8C8D",
                            }}
                        >
                            Exciting updates are on the way! Stay tuned.
                        </Typography>
                    </Box>
                </Box>


                <Box hidden={value !== 2}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "77vh",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "700",
                                color: "#2C3E50",
                                mb: 2,
                            }}
                        >
                            Coming Soon
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "16px",
                                color: "#7F8C8D",
                            }}
                        >
                            Exciting updates are on the way! Stay tuned.
                        </Typography>
                    </Box>
                </Box>


                <Box hidden={value !== 3}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "77vh",
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "700",
                                color: "#2C3E50",
                                mb: 2,
                            }}
                        >
                            Coming Soon
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "16px",
                                color: "#7F8C8D",
                            }}
                        >
                            Exciting updates are on the way! Stay tuned.
                        </Typography>
                    </Box>
                </Box>
            </Box>


        </Box>
    );
}
