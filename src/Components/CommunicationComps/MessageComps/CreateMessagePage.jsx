import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Tabs, Tab, Switch, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider, Autocomplete, Paper, Checkbox, ListItemText, Radio, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Accordion, AccordionSummary, AccordionDetails, Popper, ClickAwayListener, InputAdornment, TextareaAutosize } from "@mui/material";
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
import { GettingGrades, postMessage, postNews } from "../../../Api/Api";
import SnackBar from "../../SnackBar";
import SimpleTextEditor from "../../EditTextEditor";
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import Loader from "../../Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from "@mui/icons-material/Add";

export default function CreateMessagesPage() {
    const navigate = useNavigate()
    const token = "123"
    const [heading, setHeading] = useState("");
    const [newsContentHTML, setNewsContentHTML] = useState("");
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const todayDateTime = dayjs().format('DD-MM-YYYY HH:mm');
    const [DTValue, setDTValue] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setIsLoading] = useState('');
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState("Everyone");
    const [specificNo, setSpecificNo] = useState("");
    const [classData, setClassData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [expandedGrade, setExpandedGrade] = useState(null);
    const ref = useRef();
    const [gradeIds, setGradeIds] = useState('');
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [changesHappended, setChangesHappended] = useState(false);
    const [formattedDTValue, setFormattedDTValue] = useState(null);
    const websiteSettings = useSelector(selectWebsiteSettings);
    const [openTextarea, setOpenTextarea] = useState(false);
    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;

    //     const updatedSelectedIds = typeof value === 'string' ? value.split(',') : value;

    //     const gradeIds = updatedSelectedIds.join(',');
    //     setGradeIds(gradeIds)
    //     console.log('Grade IDs:', gradeIds,);

    //     setSelectedIds(updatedSelectedIds);
    // };
    const [previewData, setPreviewData] = useState({
        heading: '',
        content: '',
    });
    const handleChange = (newSelected) => {
        setSelectedIds(newSelected);
    };

    const toggleDropdown = (event) => {
        setAnchorEl(anchorEl ? null : ref.current);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const isGradeSelected = (grade) => {
        return grade.sections.every(section => selectedIds.includes(`${grade.id}-${section}`));
    };

    const handleGradeToggle = (grade) => {
        const allSectionIds = grade.sections.map(section => `${grade.id}-${section}`);
        const isSelected = isGradeSelected(grade);
        const updated = isSelected
            ? selectedIds.filter(id => !allSectionIds.includes(id))
            : [...selectedIds, ...allSectionIds];
        setSelectedIds(updated);
    };

    const handleSectionToggle = (gradeId, section) => {
        const sectionId = `${gradeId}-${section}`;
        setSelectedIds(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleSelectAll = () => {
        const allSectionIds = grades.flatMap(grade =>
            grade.sections.map(section => `${grade.id}-${section}`)
        );
        const allSelected = selectedIds.length === allSectionIds.length;
        setSelectedIds(allSelected ? [] : allSectionIds);
    };

    const isEveryoneChecked = () => {
        const allIds = grades.flatMap(grade =>
            grade.sections.map(section => `${grade.id}-${section}`)
        );
        return selectedIds.length === allIds.length;
    };

    const isEveryoneIndeterminate = () => {
        const allIds = grades.flatMap(grade =>
            grade.sections.map(section => `${grade.id}-${section}`)
        );
        return selectedIds.length > 0 && selectedIds.length < allIds.length;
    };

    const renderValue = () => {
        const selectedData = grades
            .map((grade) => {
                const selectedSections = grade.sections.filter((section) =>
                    selectedIds.includes(`${grade.id}-${section}`)
                );
                if (selectedSections.length > 0) {
                    return `${grade.sign} (${selectedSections.join(", ")})`;
                }
                return null;
            })
            .filter(Boolean);

        return selectedData.length > 0 ? selectedData.join(", ") : "Select Class & Section";
    };

    const getGradeSectionsPayload = () => {
        const gradeMap = new Map();

        selectedIds.forEach(id => {
            const [gradeIdStr, section] = id.split("-");
            const gradeId = parseInt(gradeIdStr);

            if (!gradeMap.has(gradeId)) {
                gradeMap.set(gradeId, []);
            }

            gradeMap.get(gradeId).push(section);
        });

        const gradeSections = Array.from(gradeMap.entries()).map(([gradeId, sections]) => ({
            gradeId,
            sections
        }));

        return { gradeSections };
    };

    const gradeSections = getGradeSectionsPayload();
    console.log(gradeSections);



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


    const handleRecipientChange = (event, value) => {
        setChangesHappended(true)
        setSelectedRecipient(value || "Everyone");
    };


    const handleHeadingChange = (e) => {
        setChangesHappended(true)
        const newValue = e.target.value;
        if (newValue.length <= 100) {
            setHeading(newValue);
        }
    };

    const handleOpenTextArea = (value) => {
        setOpenTextarea(value)
    };

    const handleRichTextChange = (htmlContent) => {
        setChangesHappended(true)
        setNewsContentHTML(htmlContent);
    };

    const handlePreview = () => {
        setPreviewData({
            heading,
            content: newsContentHTML,
        });
    };

    const handleBackClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/messages')
        }
    };

    const handleCancelClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/messages')
        }

    };

    const handleCloseDialog = (confirmed) => {
        setOpenAlert(false);

        if (confirmed) {
            navigate('/dashboardmenu/messages')
            console.log('Cancel confirmed');
        }
    };

    const handleDateChange = (newDTValue) => {
        setChangesHappended(true)
        if (newDTValue) {
            const formattedDateTime = newDTValue.format('DD-MM-YYYY HH:mm');
            setDTValue(newDTValue);
            setFormattedDTValue(formattedDateTime);
            console.log("setDTValue", formattedDateTime)
        } else {
            setDTValue(null);
        }
    };

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

    const handleInsertMessageData = async (status) => {
        setIsSubmitted(true);

        if (selectedRecipient === "Students" && selectedIds.length === 0) {
            setMessage("Please select the class");
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
            const sendData = {
                headLine: heading,
                message: newsContentHTML,
                userType: userType,
                rollNumber: rollNumber,
                status: status,
                recipient: selectedRecipient,
                gradeSections: gradeSections.gradeSections,
                postedOn: status === "post" ? todayDateTime : "",
                scheduleOn: status === "schedule" ? formattedDTValue : "",
                draftedOn: status === "draft" ? todayDateTime : "",
                updatedOn: "",
            };

            const res = await axios.post(postMessage, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (userType === "superadmin") {
                if (status === "post") {
                    setMessage("Message created successfully");
                } else if (status === "schedule") {
                    setMessage("Message scheduled successfully");
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
            setOpen(true);
            setColor(true);
            setStatus(true);

            setTimeout(() => {
                navigate("/dashboardmenu/messages");
            }, 500);

            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while inserting news data:", error);
            setMessage("An error occurred while creating the message.");
            setOpen(true);
            setColor(false);
            setStatus(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/messages" replace />;
    }

    return (
        <Box sx={{ width: "100%" }}>
            {isLoading && <Loader />}
            <SnackBar open={open} color={color} setOpen={setOpen} status={status} message={message} />
            <Box sx={{
                position: "fixed",
                zIndex: 100,
                backgroundColor: "#f2f2f2",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                px: 2,
                width: "100%",
                py: 1.5,
                marginTop: "-2px"
            }}>
                <IconButton onClick={handleBackClick} sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Create Message</Typography>
            </Box>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                    <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "7px", mt: 4.5, maxHeight: "75.6vh", overflowY: "auto" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography sx={{ mb: 0.5 }}>Select Recipient</Typography>
                                <Autocomplete
                                    disablePortal
                                    options={["Everyone", 'Students', 'Teachers', 'Specific']}
                                    value={selectedRecipient}
                                    onChange={handleRecipientChange}
                                    sx={{
                                        width: "100%",
                                        '& .MuiAutocomplete-inputRoot': {
                                            height: '40px',
                                        },
                                    }}
                                    PaperComponent={(props) => (
                                        <Paper
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '100%',
                                                fontSize: "6px",
                                                backgroundColor: '#000',
                                                color: '#fff',
                                            }}
                                        />
                                    )}
                                    renderOption={(props, option) => (
                                        <li
                                            {...props}
                                            style={{
                                                ...props.style,
                                                fontSize: "15px",
                                            }}
                                            className="classdropdownOptions"
                                        >
                                            {option}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}

                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: params.InputProps.endAdornment,
                                                sx: {
                                                    paddingRight: 0,
                                                    height: '33px',
                                                    fontSize: "15px",
                                                    backgroundColor: "#fff"
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            {selectedRecipient === "Students" &&
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography sx={{ mb: 0.5, ml: 1 }}>Select Class</Typography>
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            ref={ref}
                                            onClick={toggleDropdown}
                                            sx={{
                                                width: "100%",
                                                justifyContent: "flex-start",
                                                textTransform: "none",
                                                overflow: "hidden",
                                                color: "#000",
                                                border: "1px solid #ccc",
                                                height: "40px",
                                                textAlign: "left",
                                                backgroundColor: "#fff",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    width: "100%",
                                                }}
                                            >
                                                {renderValue()}
                                            </Box>
                                        </Button>


                                        <Popper
                                            open={Boolean(anchorEl)}
                                            anchorEl={ref.current}
                                            placement="bottom-start"
                                            style={{ zIndex: 1300, width: ref.current?.offsetWidth }}
                                        >
                                            <ClickAwayListener onClickAway={handleClickAway}>
                                                <Paper sx={{ maxHeight: 400, overflowY: "auto", bgcolor: "#000", color: "#fff", p: 1 }}>

                                                    <MenuItem
                                                        onClick={handleSelectAll}
                                                        sx={{ padding: "0px", mb: 1 }}
                                                    >
                                                        <Box sx={{
                                                            border: "1px solid #fff",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            backgroundColor: "#111",
                                                            borderRadius: "3px",
                                                            boxShadow: "none",
                                                            border: "1px solid #333",
                                                            width: "100%"
                                                        }}>
                                                            <Checkbox
                                                                checked={isEveryoneChecked()}
                                                                indeterminate={isEveryoneIndeterminate()}
                                                                sx={{ color: "#fff", "&.Mui-checked": { color: "#fff" } }}
                                                            />
                                                            <Typography sx={{ fontSize: "14px" }}>Everyone</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                    {grades.map((grade) => (
                                                        <Box key={grade.id} sx={{ mb: 1 }}>
                                                            <Accordion
                                                                expanded={expandedGrade === grade.id}
                                                                onChange={() => { }}
                                                                sx={{
                                                                    backgroundColor: "#111",
                                                                    boxShadow: "none",
                                                                    border: "1px solid #333",
                                                                }}
                                                            >
                                                                <AccordionSummary
                                                                    sx={{ px: 1, pointerEvents: "none", }}
                                                                    expandIcon={
                                                                        <ExpandMoreIcon
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setExpandedGrade(
                                                                                    expandedGrade === grade.id ? null : grade.id
                                                                                );
                                                                            }}
                                                                            sx={{ color: "#fff", pointerEvents: "auto" }}
                                                                        />
                                                                    }
                                                                >
                                                                    <Box
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleGradeToggle(grade);
                                                                        }}
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            cursor: "pointer",
                                                                            pointerEvents: "auto",
                                                                        }}
                                                                    >
                                                                        <Checkbox
                                                                            checked={isGradeSelected(grade)}
                                                                            indeterminate={
                                                                                grade.sections.some((section) =>
                                                                                    selectedIds.includes(`${grade.id}-${section}`)
                                                                                ) && !isGradeSelected(grade)
                                                                            }
                                                                            sx={{ color: "#fff", padding: "0px 10px 0px 0px", "&.Mui-checked": { color: "#fff" } }}
                                                                        />
                                                                        <Typography sx={{ fontSize: "14px", color: "white" }}>
                                                                            {grade.sign}
                                                                        </Typography>
                                                                    </Box>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    {grade.sections.map((section) => (
                                                                        <MenuItem
                                                                            key={section}
                                                                            sx={{
                                                                                padding: "0px 10px 0px 30px",
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                color: "#fff",
                                                                            }}
                                                                            onClick={() => handleSectionToggle(grade.id, section)}
                                                                        >
                                                                            <Checkbox
                                                                                checked={selectedIds.includes(`${grade.id}-${section}`)}
                                                                                sx={{ color: "#fff", padding: "0px 10px 0px 0px", "&.Mui-checked": { color: "#fff" } }}
                                                                            />
                                                                            <Typography>{section}</Typography>
                                                                        </MenuItem>
                                                                    ))}
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </Box>
                                                    ))}
                                                </Paper>
                                            </ClickAwayListener>
                                        </Popper>
                                    </Box>
                                </Grid>
                            }
                            {selectedRecipient === "Specific" &&
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Typography sx={{ mb: 0.5, ml: 1 }}>Add Admission Number</Typography>
                                    <Box >
                                        <TextField
                                            value={specificNo}
                                            size="small"
                                            sx={{ width: "100%" }}
                                            onClick={() => handleOpenTextArea(1)}
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => handleOpenTextArea(1)} edge="end">
                                                            <AddIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                    </Box>
                                    <Dialog
                                        open={openTextarea === 1}
                                        onClose={() => setOpenTextarea(null)}
                                        maxWidth="sm"
                                        fullWidth
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minHeight: '200px',
                                                padding: 2,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    pr: 3,
                                                    width: '100%',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: 'bold',
                                                        marginBottom: 1,
                                                        pb: 1,
                                                        borderBottom: "1px solid #AFAFAF",
                                                    }}
                                                >
                                                    Add Admission Number
                                                </Typography>
                                                <TextareaAutosize
                                                    minRows={6}
                                                    placeholder="Type here..."
                                                    value={specificNo}
                                                    onChange={(e) =>
                                                        setSpecificNo(e.target.value)
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #ccc',
                                                        fontSize: '14px',
                                                        marginBottom: '20px',
                                                        resize: 'none',
                                                        border: "none",
                                                        outline: 'none',
                                                    }}
                                                />
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button
                                                        onClick={() => setOpenTextarea(null)}
                                                        sx={{
                                                            textTransform: 'none',
                                                            backgroundColor: websiteSettings.mainColor,
                                                            color: websiteSettings.textColor,
                                                            borderRadius: '30px',
                                                            fontSize: '16px',
                                                            padding: '0px 35px',
                                                            '&:hover': {
                                                                backgroundColor: websiteSettings.mainColor || '#0056b3',
                                                            },
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Dialog>
                                </Grid>
                            }
                        </Grid>

                        <Typography sx={{ mt: 2 }}>Add Heading</Typography>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            fullWidth
                            value={heading}
                            sx={{ backgroundColor: "#fff", }}
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


                        <Typography sx={{ pt: 3 }}>Add Description</Typography>
                        <SimpleTextEditor
                            onContentChange={handleRichTextChange}
                        />
                        {isSubmitted && !newsContentHTML.trim() && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                                This field is required
                            </span>
                        )}

                        <Box mt={2}>
                            <Typography>Schedule Post</Typography>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={2}>
                                        <DateTimePicker
                                            sx={{ backgroundColor: "#fff", }}
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
                                        disabled={!!DTValue}
                                        sx={{
                                            textTransform: 'none',
                                            width: "120px",
                                            borderRadius: '30px',
                                            fontSize: '12px',
                                            py: 0.2,
                                            border: '1px solid black',
                                            color: 'black',
                                            fontWeight: "600",
                                            backgroundColor: "#fff",
                                        }}
                                        onClick={() => handleInsertMessageData('draft')}>
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
                                            backgroundColor: "#fff",
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
                                            <Grid item xs={6} sm={6} md={6} lg={3} sx={{
                                                display: "flex", justifyContent
                                                    : "end"
                                            }}>
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
                                                    onClick={() => handleInsertMessageData('post')}>
                                                    Publish
                                                </Button>
                                            </Grid>
                                        )}
                                        {DTValue && (
                                            <Grid item xs={6} sm={6} md={6} lg={3} sx={{
                                                display: "flex", justifyContent
                                                    : "end"
                                            }}>
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
                                                    onClick={() => handleInsertMessageData('schedule')}>
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
                                                onClick={() => handleInsertMessageData(DTValue ? 'schedule' : 'post')}>
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
                    <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "6px", height: "75.6vh", overflowY: "auto" }}>
                        <Typography sx={{ fontSize: "14px", color: "rgba(0,0,0,0.7)" }}>Preview Screen</Typography>
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

                        </Box>
                    </Box>
                </Grid>



            </Grid>
        </Box>
    );
}
