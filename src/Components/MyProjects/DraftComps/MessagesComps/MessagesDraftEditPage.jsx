import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Tabs, Tab, Switch, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider, Autocomplete, Paper, Checkbox, ListItemText, Radio, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Popper, ClickAwayListener, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../../../Redux/Slices/websiteSettingsSlice";
import ReactPlayer from "react-player";
import { FindMessage, GettingGrades, postNews, updateMessage } from "../../../../Api/Api";
import SnackBar from "../../../SnackBar";
import SimpleTextEditor from "../../../EditTextEditor";
import { selectGrades } from "../../../../Redux/Slices/DropdownController";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MessagesDraftEditPage() {
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
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [changesHappended, setChangesHappended] = useState(false);
    const [gradeIds, setGradeIds] = useState('');
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const location = useLocation();
    const { id } = location.state || {};
    const [formattedDTValue, setFormattedDTValue] = useState(null);
    const [newsStatus, setNewsStatus] = useState("");
    const [dateTimeValue, setDateTimeValue] = useState("");
    const ref = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [expandedGrade, setExpandedGrade] = useState(null);

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const handleChange = (event) => {
        setChangesHappended(true)
        const {
            target: { value },
        } = event;

        const updatedSelectedIds = typeof value === 'string' ? value.split(',') : value;

        const gradeIds = updatedSelectedIds.join(',');
        setGradeIds(gradeIds)
        console.log('Grade IDs:', gradeIds,);

        setSelectedIds(updatedSelectedIds);

    };

    const [previewData, setPreviewData] = useState({
        heading: '',
        content: '',
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

    const toggleDropdown = (event) => {
        setAnchorEl(anchorEl ? null : ref.current);
    };

    const handleRecipientChange = (event, value) => {
        setSelectedRecipient(value || "Everyone");
    };

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
        });
    };

    const handleBackClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/draft/messages')
        }
    };

    const handleCancelClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/draft/messages')
        }

    };

    const handleCloseDialog = (confirmed) => {
        setOpenAlert(false);

        if (confirmed) {
            navigate('/dashboardmenu/draft/messages')
            console.log('Cancel confirmed');
        }
    };

    const handleDateChange = (newDTValue) => {
        if (newDTValue) {
            setChangesHappended(true)
            setDTValue(newDTValue);
            const formattedDateTime = newDTValue.format('DD-MM-YYYY HH:mm');
            setFormattedDTValue(formattedDateTime)

        } else {
            setDTValue(null);
        }
    };
    const handleClickAway = () => {
        setAnchorEl(null);
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
    useEffect(() => {
        if (id) {
            handleInsertNewsData(id)
        }
    }, []);

    const handleInsertNewsData = async (id) => {
        setIsLoading(true);
        try {
            const res = await axios.get(FindMessage, {
                params: {
                    Id: id
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHeading(res.data.headLine)
            setNewsContentHTML(res.data.message)
            setNewsStatus(res.data.status)
            if (res.data.scheduleOn) {
                console.log("scheduleOn", "true")
                const parsedDate = dayjs(res.data.scheduleOn, "DD-MM-YYYY hh:mm A");
                if (parsedDate.isValid()) {
                    setDTValue(parsedDate);
                    const formattedDate = parsedDate.format("DD-MM-YYYY HH:mm");
                    setDateTimeValue(formattedDate);
                } else {
                    setDTValue(null);
                    setDateTimeValue(null);
                }
            } else {
                setDTValue(null);
                setDateTimeValue(null);
            }
            const recipient = res.data.recipient;
            const formattedRecipient =
                recipient.charAt(0) === recipient.charAt(0).toUpperCase()
                    ? recipient
                    : recipient.replace(/^\w/, (c) => c.toUpperCase());

            setSelectedRecipient(formattedRecipient);
            setSelectedGrade(res.data.grade)
            const transformedGradeDetails = res.data.gradeDetails.flatMap(item =>
                item.sections.map(section => `${item.gradeId}-${section}`)
            );
            setSelectedIds(transformedGradeDetails);
            
        } catch (error) {
            console.error('Error deleting news:', error);
        } finally {
            setIsLoading(false);
        }
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
    console.log(gradeSections, "ff");

    const handleUpdate = async (status) => {
        setIsSubmitted(true);
        if (!heading.trim()) {
            setMessage("Headline is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }

        if (!newsContentHTML.trim()) {
            setMessage("Description is required");
            setOpen(true);
            setColor(false);
            setStatus(false);
            return;
        }
        setIsLoading(true);
        try {
            const sendData = {
                id: id,
                headLine: heading,
                message: newsContentHTML,
                userType: userType,
                rollNumber: rollNumber,
                recipient: selectedRecipient,
                gradeAssignments: gradeSections.gradeSections,
                scheduleOn: formattedDTValue || dateTimeValue || "",
                updatedOn: todayDateTime,
                postedOn:status === "post" ?  todayDateTime : "",
            };

            const res = await axios.put(updateMessage, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOpen(true);
            setColor(true);
            setStatus(true);
            if (userType === "superadmin") {
                if (status === "post") {
                    setMessage("Message updated successfully");
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

            setTimeout(() => {
                navigate("/dashboardmenu/draft/messages");
            }, 500);

        } catch (error) {
            console.error("Error while inserting news data:", error);
        
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || error.response.data;
                if (errorMessage.includes("ScheduleOn must be a future date and time")) {
                    setMessage("Please provide the future date");
                    setOpen(true);
                    setColor(false);
                    setStatus(false);
                }
            }
        }
         finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
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
                <IconButton onClick={handleBackClick} sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Edit Message</Typography>
            </Box>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                    <Box sx={{border:"1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "7px", mt: 4.5, maxHeight: "75.6vh", overflowY: "auto" }}>

                        {/* <Typography sx={{ mb:0.5}}>Select</Typography> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Typography sx={{ mb: 0.5 }}>Select Recipient</Typography>
                                <Autocomplete
                                    disablePortal
                                    options={["Everyone", 'Students', 'Teachers']}
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
                                            //  label="Status"
                                            {...params}

                                            fullWidth
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: params.InputProps.endAdornment,
                                                sx: {
                                                    paddingRight: 0,
                                                    height: '33px',
                                                    fontSize: "15px",
                                                    backgroundColor:"#fff"
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
                                                color:"#000",
                                                border:"1px solid #ccc",
                                                height:"40px",
                                                textAlign:"left",
                                                backgroundColor:"#fff",
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
                        </Grid>

                        <Typography sx={{ mt: 2 }}>Add Heading</Typography>
                        <TextField
                        sx={{ backgroundColor:"#fff",}}
                            id="outlined-size-small"
                            size="small"
                            fullWidth
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


                        <Typography sx={{ pt: 3 }}>Add Description</Typography>
                        <SimpleTextEditor
                            value={newsContentHTML}
                            onContentChange={handleRichTextChange}
                        />
                        {isSubmitted && !newsContentHTML.trim() && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                                This field is required
                            </span>
                        )}
                            <Box mt={2}>
                                <Typography>Schedule</Typography>
                                <ThemeProvider theme={theme}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={2}>
                                            <DateTimePicker
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
                                            <Grid item xs={6} sm={6} md={6} lg={3} sx={{display:"flex", justifyContent:"end"}}>
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
                                                    onClick={() => handleUpdate('post')}>
                                                    Update
                                                </Button>
                                            </Grid>
                                        )}
                                        {DTValue && (
                                            <Grid item xs={6} sm={6} md={6} lg={3} sx={{display:"flex", justifyContent:"end"}}>
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
                                                    onClick={() => handleUpdate('schedule')}>
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
                                                onClick={() => handleUpdate(DTValue ? 'schedule' : 'post')}>
                                                Request Now
                                            </Button>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </Box>

                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} sx={{ py: 2, mt: 6.5, pr:2 }}>
                    <Box sx={{ border:"1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "6px", height: "75.6vh", overflowY: "auto" }}>
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
