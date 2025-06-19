import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Tabs, Tab, Switch, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider, Autocomplete, Paper, Checkbox, ListItemText, Radio, FormControl, InputLabel, Select, OutlinedInput, MenuItem, TextareaAutosize, Grid2 } from "@mui/material";
import RichTextEditor from "../../TextEditor";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import ReactPlayer from "react-player";
import { GettingGrades, postConsentForm, postFeedBack, postMessage, postNews } from "../../../Api/Api";
import SnackBar from "../../SnackBar";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Loader from "../../Loader";

export default function CreateFeedBackPage() {
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
    const [openAlert, setOpenAlert] = useState(false);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [fileType, setFileType] = useState('');


    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState("Everyone");

    const [classData, setClassData] = useState([]);
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const [selectedIds, setSelectedIds] = useState([]);
    const [gradeIds, setGradeIds] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [questionsValue, setQuestionsValue] = useState('');

    const [selectedSectionIds, setSelectedSectionIds] = useState([]);
    const [questionType, setQuestionType] = useState("Ratings");
    const [selectedSections, setSelectedSections] = useState([]);
    const [formattedSectionData, setFormattedSectionData] = useState("");
    const [filter, setFilter] = useState('Students');
    const [options, setOptions] = useState(["", "", "", ""]);

    const [previewData, setPreviewData] = useState({
        heading: '',
        content: '',
        options: [],
    });

    const websiteSettings = useSelector(selectWebsiteSettings);

    const questionOptions = [
        { label: "Ratings", value: "ratings" },
        { label: "Multiple Choice", value: "multiplechoice" },
        { label: "Open-Ended", value: "openended" }
    ];

    const handleGradeChange = (newValue) => {
        if (newValue) {
            setSelectedGradeId(newValue.id);
            setSelectedSections(newValue.sections || []);
            setSelectedSectionIds([]);
        } else {
            setSelectedGradeId(null);
            setSelectedSections([]);
            setSelectedSectionIds([]);
        }
    };

    const handleSectionChange = (event) => {
        const value = event.target.value;
        setSelectedSectionIds(Array.isArray(value) ? value : []);
        const formattedValue = value.length > 0 ? value.join(',') : "";
        sendSectionData(formattedValue);
    };

    const sendSectionData = (sectionData) => {
        console.log({ section: sectionData });
        setFormattedSectionData(sectionData)
    };

    const handleQuestionType = (event, newValue) => {
        setQuestionType(newValue ? newValue.value : "");
        setOptions(["", ""]);
    };


    const handleHeadingChange = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 100) {
            setHeading(newValue);
        }
    };
    const handleAddOption = () => {
        if (options.length < 4) {
            setOptions([...options, ""]);
        }
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const formattedOptions = options.reduce((acc, value, index) => {
        acc[`Option0${index + 1}`] = value;
        return acc;
    }, {});

    const handlePreview = () => {
        const filteredOptions = Object.values(options).filter((opt) => opt.trim() !== "");
        setPreviewData({
            heading,
            content: questionsValue,
            options: filteredOptions,
        });
    };

    const handleCancelClick = () => {
        setOpenAlert(true);
    };

    const handleCloseDialog = (confirmed) => {
        setOpenAlert(false);

        if (confirmed) {
            navigate('/dashboardmenu/feedback')
            console.log('Cancel confirmed');
        }
    };

    const handleQuestionChange = (event) => {
        setQuestionsValue(event.target.value);
    };




    useEffect(() => {
        if (!uploadedFiles && !pastedLink.trim()) {
            setFileType("");
        }
    }, [uploadedFiles, pastedLink]);

    useEffect(() => {
        fetchClass()
    }, []);

    const fetchClass = async () => {
        try {
            const res = await axios.get(GettingGrades, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setClassData(res.data)
            console.log("class:", res.data);
        } catch (error) {
            console.error("Error while inserting news data:", error);
        } finally {
            setIsLoading(false);
        }
    }


    const handleInsertNewsData = async (status) => {
        // const filledOptions = options.filter((opt) => opt.trim() !== "");

        // if (filledOptions.length < 2) {
        //     setMessage("Please fill the options");
        //     setOpen(true);
        //     setStatus(false);
        //     setColor(false);
        //     return;
        // }
        if (!selectedGradeId || selectedGradeId === "") {
            setMessage("Please select a class.");
            setOpen(true);
            setStatus(false);
            setColor(false);
            return;
        }

        if (selectedGradeId !== "0" && selectedSectionIds.length === 0) {
            setMessage("Please select the section");
            setOpen(true);
            setStatus(false);
            setColor(false);
            return;
        }

        if (!heading.trim()) {
            setMessage("Headline is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        if (status === "post" || status === "schedule") {
            if (!questionsValue.trim()) {
                setMessage("Question is required");
                setOpen(true);
                setColor(false);
                setStatus(false);
                return;
            }
        }
        setIsLoading(true);

        try {
            const sendData = {

                userType: userType,
                rollNumber: rollNumber,
                recipient: "Students",
                gradeId: filter === "Students" ? selectedGradeId : "",
                section: filter === "Students" ? formattedSectionData : "",
                heading: heading,
                question: questionsValue,
                FeedBackType: questionType || "ratings",
                ...formattedOptions,
                status: status,
                postedOn: status === "post" ? todayDateTime : "",
                draftedOn: status === "draft" ? todayDateTime : "",
            };

            const res = await axios.post(postFeedBack, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            setMessage("Data Added successfully");
            setTimeout(() => {
                navigate('/dashboardmenu/feedback')
            }, 500);
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while inserting data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/dashboard" replace />;
    }

    return (
        <Box sx={{ width: "100%" }}>
              {isLoading && <Loader />}
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            <Box sx={{
                position: "fixed",
                zIndex: 100,
                backgroundColor: "#f2f2f2",
                borderBottom:"1px solid #ddd",
                display: "flex",
                alignItems: "center",
                width: "100%",
                py: 1.5,
                px:2,
                marginTop: "-2px"
            }}>
                <Link style={{ textDecoration: "none" }} to="/dashboardmenu/feedback">
                    <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                        <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                </Link>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Create Feedback</Typography>
            </Box>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                    <Box sx={{border:"1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "7px", mt: 4.5, height: "75.6vh", overflowY: "auto", position: "relative" }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                {filter === "Students" && (
                                    <Box>
                                        <Typography sx={{ mb: 0.5 }}>Select Class</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={[{ id: '0', sign: 'EVERYONE' }, ...grades]}
                                            getOptionLabel={(option) => option.sign}
                                            value={
                                                [{ id: '0', sign: 'EVERYONE' }, ...grades].find(
                                                    (item) => item.id === selectedGradeId
                                                ) || null
                                            }
                                            onChange={(event, newValue) => {
                                                handleGradeChange(newValue);
                                            }}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            sx={{ width: '100%' }}
                                            PaperComponent={(props) => (
                                                <Paper
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        maxHeight: '150px',
                                                        backgroundColor: '#000',
                                                        color: '#fff',
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
                                                            height: '40px',
                                                            fontSize: '13px',
                                                            fontWeight: '600',
                                                            backgroundColor:"#fff"
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                {filter === "Students" && (

                                    selectedGradeId !== "" && selectedGradeId !== "0" && (
                                        <>
                                            <Typography sx={{ mb: 0.5, ml: 1 }}>Select Section</Typography>
                                            <FormControl disabled={!selectedGradeId} sx={{ width: '100%' }}>
                                                <Select
                                                    multiple
                                                    value={selectedSectionIds}
                                                    onChange={handleSectionChange}
                                                    input={<OutlinedInput />}
                                                    sx={{
                                                        height: '40px',
                                                        fontSize: '15px',
                                                        backgroundColor:"#fff"
                                                    }}
                                                    renderValue={(selected) =>
                                                        selected.join(', ')
                                                    }
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxHeight: 250,
                                                                overflow: 'auto',
                                                                backgroundColor: '#000',
                                                                color: '#fff',
                                                                '& .MuiMenuItem-root': {
                                                                    fontSize: '15px',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {selectedSections.map((section) => (
                                                        <MenuItem key={section} value={section}>
                                                            <Checkbox
                                                                checked={selectedSectionIds.includes(section)}
                                                                size="small"
                                                                sx={{
                                                                    padding: '0 5px',
                                                                    color: '#fff',
                                                                    '&.Mui-checked': {
                                                                        color: '#fff',
                                                                    },
                                                                }}
                                                            />
                                                            <Typography sx={{ fontSize: '14px', ml: 1 }}>{section}</Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </>
                                    ))}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Autocomplete
                                    disablePortal
                                    options={questionOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={questionOptions.find((opt) => opt.value === questionType) || null}
                                    onChange={handleQuestionType}
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
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select Question Type"
                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                sx: {
                                                    paddingRight: 0,
                                                    height: "40px",
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                    backgroundColor:"#fff"
                                                },
                                            }}
                                        />
                                    )}
                                />

                            </Grid>
                        </Grid>

                        <Typography sx={{ mt: 2 }}>Add Heading</Typography>

                        <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            value={heading}
                            onChange={handleHeadingChange}
                            sx={{ backgroundColor: "#fff" }}
                        />
                        <Typography sx={{ fontSize: "12px" }} color="textSecondary">
                            {`${heading.length}/100`}
                        </Typography>
                        <Box>
                            <Box sx={{ mb: 2, boxSizing: "border-box", width: "100%" }}>
                                <Typography>Question</Typography>
                                <TextareaAutosize
                                    minRows={5}
                                    value={questionsValue}
                                    onChange={handleQuestionChange}
                                    style={{
                                        width: "100%",
                                        fontSize: "16px",
                                        border: "1px solid #ccc",
                                        fontFamily: "Arial, sans-serif",
                                        boxSizing: "border-box",
                                        borderRadius: "4px",
                                        resize: "both",
                                        overflowY: "auto",
                                        padding: "8px"
                                    }}
                                />
                            </Box>
                        </Box>
                        {questionType === "multiplechoice" ? (
                            <Box sx={{ minHeight: "130px" }}>
                                <Box sx={{ display: "flex", alignItems: "center", pb: 1 }}>
                                    <Typography >Options</Typography>
                                    {options.length < 4 && (
                                        <Grid item xs={12}>
                                            <IconButton onClick={handleAddOption} sx={{ color: "green" }}>
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Box>

                                <Grid container spacing={2}>
                                    {Object.keys(options).map((key, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            key={key}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <TextField
                                                size="small"
                                                fullWidth
                                                value={options[key]}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                sx={{ backgroundColor: "#fff" }}
                                                placeholder={`Option ${index + 1}`}
                                                inputProps={{ maxLength: 50 }}
                                            />
                                            {Object.keys(options).length > 2 && index >= 2 ? (
                                                <IconButton onClick={() => handleRemoveOption(key)} color="error">
                                                    <RemoveCircleIcon />
                                                </IconButton>
                                            ) : (
                                                <Box sx={{ width: "43px" }}></Box>
                                            )}
                                        </Grid>
                                    ))}

                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{ height: "130px" }} />
                        )
                        }
                        <Box sx={{ mt: 3, }}>
                            <Grid container>
                                <Grid item xs={6} sm={6} md={6} lg={5}>
                                    {/* <Button
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
                                        }}
                                        onClick={() => handleInsertNewsData('draft')}>
                                        Save as Draft
                                    </Button> */}
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={2.3}>
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
                                <Grid item xs={6} sm={6} md={6} lg={2.3}>
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
                                        }}
                                        onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                </Grid>

                                <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                                    <DialogTitle sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        backgroundColor: '#333',
                                    }}>
                                        Are you sure?
                                    </DialogTitle>
                                    <DialogContent sx={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#333',
                                    }}>
                                        <p>Do you really want to cancel? Your changes might not be saved.</p>
                                    </DialogContent>
                                    <DialogActions sx={{
                                        justifyContent: 'center',
                                        backgroundColor: '#333',
                                    }}>
                                        <Button
                                            onClick={() => handleCloseDialog(false)}
                                            sx={{
                                                textTransform: 'none',
                                                width: "80px",
                                                borderRadius: '30px',
                                                fontSize: '16px',
                                                py: 0.2,
                                                border: '1px solid white',
                                                color: 'white',
                                                fontWeight: "600",
                                            }}
                                        >
                                            No
                                        </Button>
                                        <Button
                                            onClick={() => handleCloseDialog(true)}
                                            sx={{
                                                textTransform: 'none',
                                                backgroundColor: websiteSettings.mainColor,
                                                width: "80px",
                                                borderRadius: '30px',
                                                fontSize: '16px',
                                                py: 0.2,
                                                color: websiteSettings.textColor,
                                                fontWeight: "600",
                                            }}
                                        >
                                            Yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>




                                <Grid item xs={6} sm={6} md={6} lg={2.4} sx={{ display: "flex", justifyContent: "end" }}>
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

                            </Grid>
                        </Box>

                    </Box>
                </Grid>


                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ py: 2, mt: 6.5, pr:2 }}>
                    <Box sx={{border:"1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "6px", height: "75.6vh", overflowY: "auto" }}>
                        <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.7)" }}>Preview Screen</Typography>
                        <hr style={{ border: "0.5px solid #CFCFCF" }} />
                        <Box>
                            {previewData.heading && (
                                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
                                    {previewData.heading}
                                </Typography>
                            )}

                            {previewData.content && (
                                <Typography sx={{ fontSize: "14px", pt: 1 }}>
                                    {previewData.content}
                                </Typography>
                            )}

                            {previewData.options.length > 0 && (
                                <Box sx={{ pt: 1 }}>
                                    {previewData.options.map((option, index) => (
                                        <Typography key={index} sx={{ fontSize: "14px" }}>
                                            {index + 1}. {option}
                                        </Typography>
                                    ))}
                                </Box>
                            )}


                        </Box>
                    </Box>
                </Grid>



            </Grid>
        </Box>
    );
}
