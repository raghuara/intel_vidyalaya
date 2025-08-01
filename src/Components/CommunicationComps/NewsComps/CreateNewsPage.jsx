import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Tabs, Tab, Switch, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider } from "@mui/material";
import RichTextEditor from "../../TextEditor";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import ReactPlayer from "react-player";
import { postNews } from "../../../Api/Api";
import SnackBar from "../../SnackBar";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleTextEditor from "../../EditTextEditor";
import Loader from "../../Loader";

export default function CreateNewsPage() {
    const navigate = useNavigate()
    const token = "123"
    const [heading, setHeading] = useState("");
    const [newsContentHTML, setNewsContentHTML] = useState("");
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name

    const todayDateTime = dayjs().format('DD-MM-YYYY HH:mm');

    const [activeTab, setActiveTab] = useState(0);
    const [pasteLinkToggle, setPasteLinkToggle] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pastedLink, setPastedLink] = useState("");
    const [DTValue, setDTValue] = useState(null);
    const [formattedDTValue, setFormattedDTValue] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [fileType, setFileType] = useState('');

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [changesHappended, setChangesHappended] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [invlalidYoutubeLink, setInvalidYoutubeLink] = useState(false);
    const [error, setError] = useState("");
    const [notValidLink, setNotValidLink] = useState(true);

    const [previewData, setPreviewData] = useState({
        heading: '',
        content: '',
        uploadedFiles: [],
        pastedLink: '',
    });

    const websiteSettings = useSelector(selectWebsiteSettings);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#000',
            },
        },
        components: {
            MuiPickersPopper: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#333333',
                        color: '#FFFFFF',
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: '#000',
                    },
                    root: {
                        '&.MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& fieldset': {
                                borderColor: '#737373',
                            },
                            '&:hover fieldset': {
                                borderColor: '#737373',
                            },
                            '&.Mui-error fieldset': {
                                borderColor: '#737373 !important',
                            },
                        },
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: '#737373',
                    },
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        color: '#FFFFFF',
                        '&.Mui-selected': {
                            backgroundColor: websiteSettings.mainColor + ' !important',
                            color: '#000 !important',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: websiteSettings.mainColor + ' !important',
                        },
                        '&.Mui-focused': {
                            backgroundColor: websiteSettings.mainColor + ' !important',
                            color: '#000',
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': {
                            backgroundColor: websiteSettings.mainColor + ' !important',
                            color: websiteSettings.textColor + ' !important',
                        },
                    },
                },
            },
        },
    });


    const handleTabChange = (_, newValue) => {
        setActiveTab(newValue);
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const validFormats = ['image/jpeg', 'image/webp', 'image/png'];

            const validFiles = acceptedFiles.filter(file => validFormats.includes(file.type));

            if (validFiles.length > 0) {
                setChangesHappended(true)
                setPastedLink("");
                setUploadedFiles([validFiles[0]]);
                setFileType("image");
            } else {
                alert("Only JPEG, WebP, or PNG files are allowed.");
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".jpg, .jpeg, .webp, .png"
    });


    const handleHeadingChange = (e) => {
        setChangesHappended(true)
        const newValue = e.target.value;
        if (newValue.length <= 100) {
            setHeading(newValue);
        }
    };

    const handleRichTextChange = (htmlContent) => {
        setChangesHappended(true)
        setNewsContentHTML(htmlContent);
    };


    const handlePreview = () => {
        setPreviewData({
            heading,
            content: newsContentHTML,
            uploadedFiles,
            pastedLink,
        });
    };

    function isYouTubeLink(url) {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|(?:watch\?v=|.+\/videoseries\?v=))|youtu\.be\/)[^&?\/\s]+/;
        return youtubeRegex.test(url);
    }

    const handleLinkUpload = (e) => {
        setChangesHappended(true);
        const link = e.target.value;
        setPastedLink(link);

        const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S+)?$/;

        if (!youtubeRegex.test(link)) {
            setError("Invalid YouTube link. Please enter a valid YouTube video URL.");
            // setNotValidLink(true)
            setFileType("");
        } else {
            setError("");
            setUploadedFiles([]);
            setFileType("link");
        }
    };

    const handleBackClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/news')
        }

    };
    const handleCancelClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/news')
        }

    };
    const handleImageClose = () => {
        setUploadedFiles([]);
        setFileType('')
    };

    const handleCloseDialog = (confirmed) => {
        setOpenAlert(false);

        if (confirmed) {
            navigate('/dashboardmenu/news')
            console.log('Cancel confirmed');
        }
    };

    const handleDateChange = (newDTValue) => {
        if (newDTValue) {
            const formattedDateTime = newDTValue.format('DD-MM-YYYY HH:mm');
            setDTValue(newDTValue);
            setFormattedDTValue(formattedDateTime);
        } else {
            setDTValue(null);
        }
    };

    useEffect(() => {
        if (!uploadedFiles && !pastedLink.trim()) {
            setFileType("");
        }
    }, [uploadedFiles, pastedLink]);


    const handleInsertNewsData = async (status) => {

        setIsSubmitted(true);

        if (!heading.trim()) {
            setMessage("Headline is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (status === "post" || status === "schedule") {
            if (!newsContentHTML.trim()) {
                setMessage("Description is required");
                setOpen(true);
                setColor(false);
                setStatus(false);
                return;
            }
        }

        setIsLoading(true);

        try {
            const sendData = new FormData();

            sendData.append("HeadLine", heading);
            sendData.append("News", newsContentHTML);
            sendData.append("UserType", userType);
            sendData.append("RollNumber", rollNumber);
            sendData.append("PostedOn", todayDateTime);
            sendData.append("Status", status);
            sendData.append("ScheduleOn", formattedDTValue || "");
            sendData.append("DraftedOn", todayDateTime);
            sendData.append("FileType", fileType || "empty");
            sendData.append("File", uploadedFiles[0] || '');
            sendData.append("Link", pastedLink || '');


            const res = await axios.post(postNews, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpen(true);
            setColor(true);
            setStatus(true);

            if (userType === "superadmin") {
                if (status === "post") {
                    setMessage("News created successfully");
                } else if (status === "schedule") {
                    setMessage("News scheduled successfully");
                } else {
                    setMessage("Draft saved successfully");
                }
            }

            if (userType !== "superadmin") {
                if (status === "draft") {
                    setMessage("Draft saved successfully");
                } else {
                    setMessage("Requested successfully");
                }
            }
            setTimeout(() => {
                navigate('/dashboardmenu/news')
            }, 500);
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while inserting news data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/news" replace />;
    }

    return (
        <Box sx={{ width: "100%" }}>

            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            {isLoading && <Loader />}
            <Box sx={{
                position: "fixed",
                zIndex: 100,
                backgroundColor: "#f2f2f2",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                width: "100%",
                py: 1.5,
                marginTop: "-2px",
                px: 2,
            }}>
                <IconButton onClick={handleBackClick} sx={{ width: "27px", height: "27px", marginTop: '2px', }}>
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Create News</Typography>
            </Box>
            {(userType === "superadmin" || userType === "admin" || userType === "staff") &&
                <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                        <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "7px", mt: 4.5, maxHeight: "75.6vh", overflowY: "auto" }}>
                            <Typography>Add Heading <span style={{ color: "#777", fontSize: "13px" }}> (Required)</span></Typography>
                            <TextField
                                sx={{ backgroundColor: "#fff" }}
                                id="outlined-size-small"
                                size="small"
                                fullWidth
                                required
                                value={heading}
                                onChange={handleHeadingChange}
                            />
                            {isSubmitted && !heading.trim() && (
                                <span style={{ color: "red", fontSize: "12px" }}>
                                    This field is required
                                </span>
                            )}
                            <Typography sx={{ fontSize: "12px" }} color="textSecondary">
                                {`${heading.length}/100`}
                            </Typography>


                            <Typography sx={{ pt: 3 }}>Add Description<span style={{ color: "#777", fontSize: "13px" }}> (Required)</span></Typography>
                            <SimpleTextEditor
                                onContentChange={handleRichTextChange}

                            />
                            {isSubmitted && !newsContentHTML.trim() && (
                                <span style={{ color: "red", fontSize: "12px" }}>
                                    This field is required
                                </span>
                            )}



                            <Box
                                sx={{
                                    width: "100%",
                                    backgroundColor: "#fdfdfd",
                                    borderRadius: "7px",
                                    pt: 3
                                }}
                            >
                                <Tabs value={activeTab} onChange={handleTabChange}  >
                                    <Tab sx={{ textTransform: "none" }} label="Select Image" />
                                    <Tab sx={{ textTransform: "none" }} label="Add Link" />
                                    <Box sx={{ display: "flex0", justifyContent: "center", width: "100%" }}>
                                        <Typography color="textSecondary" sx={{ mt: 2, textAlign: "right", fontSize: "12px" }}>
                                            (*Upload either an image or a link)
                                        </Typography>
                                    </Box>

                                </Tabs>

                                {activeTab === 0 && (
                                    <Box sx={{ mt: 2, textAlign: "center" }}>
                                        <Box
                                            {...getRootProps()}
                                            sx={{
                                                border: "2px dashed #1976d2",
                                                borderRadius: "8px",
                                                p: 1,
                                                backgroundColor: isDragActive ? "#e3f2fd" : "#e3f2fd",
                                                textAlign: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <input {...getInputProps()} accept=".jpg, .jpeg, .webp, .png" />
                                            <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                                            Drag and drop files here, or click to upload.
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                            Supported formats: JPG, JPEG, WebP, PNG 
                                            </Typography>
                                            <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                                            Max file size: 25MB
                                            </Typography>
                                        </Box>
                                        {uploadedFiles.length > 0 && (
                                            <Box
                                                sx={{
                                                    mt: 1,
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    gap: 2,
                                                }}
                                            >
                                                {/* Selected Image Preview */}
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        width: "100px",
                                                        height: "100px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "8px",
                                                    }}
                                                >
                                                    <img
                                                        src={uploadedFiles[0] instanceof File ? URL.createObjectURL(uploadedFiles[0]) : uploadedFiles[0].url || uploadedFiles[0]}
                                                        alt="Selected"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    {/* Remove Icon */}
                                                    <IconButton
                                                        sx={{
                                                            position: "absolute",

                                                            top: -15,
                                                            right: -15,
                                                        }}
                                                        onClick={handleImageClose}
                                                    >
                                                        <CancelIcon style={{ backgroundColor: "#777", color: "#fff", borderRadius: "30px" }} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                )}

                                {activeTab === 1 && (
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            sx={{ backgroundColor: "#fff" }}
                                            fullWidth
                                            size="small"
                                            placeholder="Paste your link here"
                                            InputProps={{
                                                startAdornment: (
                                                    <InsertLinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                                                ),
                                            }}
                                            value={pastedLink}
                                            onChange={handleLinkUpload}
                                            error={!!error}
                                            helperText={error}
                                        />

                                        <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 1 }}>
                                            Paste a YouTube link here.
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <Box mt={2}>
                                <Typography>Schedule Post</Typography>
                                <ThemeProvider theme={theme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={2} sx={{ minWidth: "100%" }}>
                                            <DateTimePicker
                                                closeOnSelect={false}
                                                sx={{ backgroundColor: "#fff" }}
                                                value={dayjs(DTValue)}
                                                disablePast
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </ThemeProvider>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <Grid container>
                                    <Grid item xs={6} sm={6} md={6} lg={4.4}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                textTransform: 'none',
                                                width: "120px",
                                                borderRadius: '30px',
                                                fontSize: '12px',
                                                py: 0.2,
                                                border: '1px solid black',
                                                color: 'black',
                                                fontWeight: "600",
                                                backgroundColor: "#fff"
                                            }}
                                            onClick={() => handleInsertNewsData('draft')}>
                                            Save as Draft
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={2.3} sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            sx={{
                                                textTransform: 'none',
                                                width: "80px",
                                                borderRadius: '30px',
                                                fontSize: '12px',
                                                py: 0.2,
                                                color: 'black',
                                                fontWeight: "600",
                                            }}
                                            onClick={handlePreview}>
                                            Preview
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={2.3} sx={{ display: "flex", justifyContent: "end" }}>
                                        <Button
                                            sx={{
                                                textTransform: 'none',
                                                width: "80px",
                                                borderRadius: '30px',
                                                fontSize: '12px',
                                                py: 0.2,
                                                border: '1px solid black',
                                                color: 'black',
                                                fontWeight: "600",
                                                backgroundColor: "#fff"
                                            }}
                                            onClick={handleCancelClick}>
                                            Cancel
                                        </Button>
                                    </Grid>


                                    <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                                        <Box sx={{ display: "flex", justifyContent: "center", p: 2, backgroundColor: '#fff', }}>

                                            <Box sx={{
                                                textAlign: 'center',
                                                backgroundColor: '#fff',
                                                p: 3,
                                                width: "70%",
                                            }}>

                                                <Typography sx={{ fontSize: "20px" }}> Do you really want to cancel? Your changes might not be saved.</Typography>
                                                <DialogActions sx={{
                                                    justifyContent: 'center',
                                                    backgroundColor: '#fff',
                                                    pt: 2
                                                }}>
                                                    <Button
                                                        onClick={() => handleCloseDialog(false)}
                                                        sx={{
                                                            textTransform: 'none',
                                                            width: "80px",
                                                            borderRadius: '30px',
                                                            fontSize: '16px',
                                                            py: 0.2,
                                                            border: '1px solid black',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        No
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleCloseDialog(true)}
                                                        sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: websiteSettings.mainColor,
                                                            width: "90px",
                                                            borderRadius: '30px',
                                                            fontSize: '16px',
                                                            py: 0.2,
                                                            color: websiteSettings.textColor,
                                                        }}
                                                    >
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Box>

                                        </Box>
                                    </Dialog>


                                    {userType === "superadmin" &&
                                        <>
                                            {!DTValue && (
                                                <Grid item xs={6} sm={6} md={6} lg={3} sx={{ display: "flex", justifyContent: "end" }}>

                                                    <Button
                                                        sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: websiteSettings.mainColor,
                                                            width: "80px",
                                                            borderRadius: '30px',
                                                            fontSize: '12px',
                                                            py: 0.2,
                                                            color: websiteSettings.textColor,
                                                            fontWeight: "600",
                                                        }}
                                                        onClick={() => handleInsertNewsData('post')}>
                                                        Publish
                                                    </Button>
                                                </Grid>
                                            )}
                                            {DTValue && (
                                                <Grid item xs={6} sm={6} md={6} lg={3} sx={{ display: "flex", justifyContent: "end" }}>
                                                    <Button
                                                        sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: websiteSettings.mainColor,
                                                            width: "80px",
                                                            borderRadius: '30px',
                                                            fontSize: '12px',
                                                            py: 0.2,
                                                            color: websiteSettings.textColor,
                                                            fontWeight: "600",
                                                        }}
                                                        onClick={() => handleInsertNewsData('schedule')}>
                                                        Schedule
                                                    </Button>
                                                </Grid>
                                            )}
                                        </>
                                    }
                                    {userType !== "superadmin" &&
                                        <>
                                            <Grid item xs={6} sm={6} md={6} lg={3} sx={{ display: "flex", justifyContent: "end" }}>

                                                <Button
                                                    sx={{
                                                        textTransform: 'none',
                                                        backgroundColor: websiteSettings.mainColor,
                                                        width: "100px",
                                                        borderRadius: '30px',
                                                        fontSize: '12px',
                                                        py: 0.2,
                                                        color: websiteSettings.textColor,
                                                        fontWeight: "600",
                                                    }}
                                                    onClick={() => handleInsertNewsData(DTValue ? 'schedule' : 'post')}>
                                                    Request Now
                                                </Button>
                                            </Grid>
                                        </>
                                    }

                                </Grid>
                            </Box>

                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ py: 2, mt: 6.5, pr: 2 }}>
                        <Box sx={{ backgroundColor: "#fbfbfb", p: 2, borderRadius: "6px", height: "75.6vh", overflowY: "auto", border: "1px solid #E0E0E0" }}>
                            <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.7)" }}>Live Preview</Typography>
                            <hr style={{ border: "0.5px solid #CFCFCF" }} />
                            <Box>
                                {previewData.heading && (
                                    <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                                        {previewData.heading}
                                    </Typography>
                                )}

                                {previewData.content && (
                                    <Typography
                                        sx={{ fontSize: "14px", pt: 1 }}
                                        dangerouslySetInnerHTML={{ __html: previewData.content }}
                                    />
                                )}



                                {previewData.uploadedFiles.length > 0 && !previewData.pastedLink && (
                                    <Grid container spacing={2}>
                                        {previewData.uploadedFiles.map((file, index) => (
                                            <Grid key={index} item xs={12} sm={12} md={5} lg={12} sx={{ display: "flex", py: 1 }}>
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    width={'273px'}
                                                    height={'210px'}
                                                    alt={`Uploaded file ${index + 1}`}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}

                                {!previewData.uploadedFiles.length && previewData.pastedLink && (
                                    <>
                                        {isYouTubeLink(previewData.pastedLink) ? (
                                            <Box>
                                                <ReactPlayer
                                                    url={previewData.pastedLink}
                                                    width='273px'
                                                    height='210px'
                                                    playing={false}
                                                />
                                            </Box>

                                        ) : (
                                            <Box>
                                                <Typography color="error">
                                                    Please provide a valid YouTube link.
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                )}




                            </Box>
                        </Box>
                    </Grid>



                </Grid>
            }
        </Box>
    );
}
