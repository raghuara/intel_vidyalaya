import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Tabs, Tab, Switch, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, createTheme, ThemeProvider, Autocomplete, Paper, FormControl, Select, OutlinedInput, MenuItem, Checkbox, Popper, ClickAwayListener, AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { selectWebsiteSettings } from "../../../Redux/Slices/websiteSettingsSlice";
import { GettingGrades, postCircular, postNews } from "../../../Api/Api";
import SnackBar from "../../SnackBar";
import CancelIcon from "@mui/icons-material/Cancel";
import SimpleTextEditor from "../../EditTextEditor";
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import Loader from "../../Loader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CreateNewsPage() {
    const navigate = useNavigate()
    const ref = useRef();
    const token = "123"
    const [heading, setHeading] = useState("");
    const [newsContentHTML, setNewsContentHTML] = useState("");
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name
    const [formattedDTValue, setFormattedDTValue] = useState(null);
    const todayDateTime = dayjs().format('DD-MM-YYYY HH:mm');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pastedLink, setPastedLink] = useState("");
    const [DTValue, setDTValue] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [isLoading, setIsLoading] = useState('');
    const [fileType, setFileType] = useState('');
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState("Everyone");
    const [classData, setClassData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [gradeIds, setGradeIds] = useState('');
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const [changesHappended, setChangesHappended] = useState(false);
    const [expandedGrade, setExpandedGrade] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

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

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const validFormats = ['image/jpeg', 'image/webp', 'image/png', 'application/pdf'];

            const validFiles = acceptedFiles.filter(file => validFormats.includes(file.type));

            if (validFiles.length > 0) {
                setPastedLink("");
                setChangesHappended(true)
                const file = validFiles[0];
                setUploadedFiles([file]);
                setFileType(file.type.includes('pdf') ? 'pdf' : 'image');
            } else {
                alert("Only JPEG, WebP, PNG or PDF files are allowed.");
            }
        }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".jpg, .jpeg, .webp, .png, .pdf"
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

    const handleBackClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/circulars')
        }

    };

    const handleCancelClick = () => {
        if (changesHappended) {
            setOpenAlert(true);
        } else {
            navigate('/dashboardmenu/circulars')
        }

    };

    const handleCloseDialog = (confirmed) => {
        setOpenAlert(false);

        if (confirmed) {
            navigate('/dashboardmenu/circulars')
            console.log('Cancel confirmed');
        }
    };

    const handleImageClose = () => {
        setUploadedFiles([]);
        setFileType('')
    };

    const handleRecipientChange = (event, value) => {
        setChangesHappended(true)
        setSelectedRecipient(value || "Everyone");
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

    useEffect(() => {
        if (!uploadedFiles && !pastedLink.trim()) {
            setFileType("");
        }
    }, [uploadedFiles, pastedLink]);


    const handleInsertNewsData = async (status) => {
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
            const sendData = new FormData();

            sendData.append("HeadLine", heading);
            sendData.append("Circular", newsContentHTML);
            sendData.append("UserType", userType);
            sendData.append("RollNumber", rollNumber);
            sendData.append("PostedOn", todayDateTime);
            sendData.append("Status", status);
            sendData.append("ScheduleOn", formattedDTValue || "");
            sendData.append("DraftedOn", status === 'draft' ? todayDateTime : "");
            sendData.append("FileType", fileType || "empty");
            sendData.append("File", uploadedFiles[0] || '');
            sendData.append("Recipient", selectedRecipient);
            sendData.append("GradeIds", gradeIds);
            const { gradeSections } = getGradeSectionsPayload();
            gradeSections.forEach((item, index) => {
                sendData.append(`CircularGradeSections[${index}].GradeId`, item.gradeId);
                item.sections.forEach((section, sIndex) => {
                    sendData.append(`CircularGradeSections[${index}].Sections[${sIndex}]`, section);
                });
            });


            const res = await axios.post(postCircular, sendData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpen(true);
            setColor(true);
            setStatus(true);
            if (userType === "superadmin") {
                if (status === "post") {
                    setMessage("Circulars created successfully");
                } else if (status === "schedule") {
                    setMessage("Circulars scheduled successfully");
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
                navigate('/dashboardmenu/circulars')
            }, 500);
            console.log("Response:", res.data);
        } catch (error) {
            console.error("Error while inserting circular data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (userType !== "superadmin" && userType !== "admin" && userType !== "staff") {
        return <Navigate to="/dashboardmenu/circulars" replace />;
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
                px: 2,
                alignItems: "center",
                width: "100%",
                py: 1.5,
                marginTop: "-2px"
            }}>
                <IconButton onClick={handleBackClick} sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                    <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>Create Circulars</Typography>
            </Box>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} mt={2} p={2}>
                    <Box sx={{ border: "1px solid #E0E0E0", backgroundColor: "#fbfbfb", p: 2, borderRadius: "7px", mt: 4.5, maxHeight: "75.6vh", overflowY: "auto" }}>
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
                                                    backgroundColor: "#FFF"
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
                        </Grid>

                        <Typography sx={{ mt: 2 }}>Add Heading <span style={{ color: "#777", fontSize: "13px", }}> (Required)</span></Typography>
                        <TextField
                            sx={{ backgroundColor: "#fff", }}
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
                            }}
                        >
                            <Typography sx={{ pt: 2 }}>Select Image</Typography>

                            <Box sx={{ mt: 1, textAlign: "center" }}>
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
                                    <input {...getInputProps()} accept=".jpg, .jpeg, .webp, .png, .pdf" />
                                    <UploadFileIcon sx={{ fontSize: 40, color: "#000" }} />
                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                                        Drag and Drop files here or <Typography component="span" color="primary">Choose file</Typography>
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Supported Format: JPG, JPEG, WebP, PNG, PDF
                                    </Typography>
                                    <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                                        Maximum Size: 25MB
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
                                        {fileType === 'image' ? (
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
                                        ) : (<Typography variant="body2" color="textSecondary">
                                            Selected: {uploadedFiles[0].name}
                                        </Typography>)}
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box mt={2}>
                            <Typography>Schedule Post</Typography>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={2}>
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
                                    </>}

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

                            <Grid container spacing={2} mt={2}>
                                {previewData.uploadedFiles.map((file, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={5} lg={12} sx={{ display: "flex", py: 1 }}>
                                        {fileType === "image" ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                width={'273px'}
                                                height={'210px'}
                                                alt={`Uploaded file ${index + 1}`}
                                            />
                                        ) : fileType === "pdf" ? (
                                            <iframe
                                                src={URL.createObjectURL(file)}
                                                width="400px"
                                                height="400px"
                                                title={`Uploaded PDF ${index + 1}`}
                                            ></iframe>

                                        ) : null}
                                    </Grid>
                                ))}
                            </Grid>






                        </Box>
                    </Box>
                </Grid>



            </Grid>
        </Box>
    );
}
