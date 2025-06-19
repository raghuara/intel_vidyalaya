import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { selectGrades } from "../../../Redux/Slices/DropdownController";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const categoryColorMap = {
    Nursery: {
        primary: "#A749CC",
        light: "rgba(167, 73, 204, .1)",
        dark: "rgba(167, 73, 204, .2)",
    },
    Primary: {
        primary: "#F6A059",
        light: "rgba(246, 160, 89, .1)",
        dark: "rgba(246, 160, 89, .2)",
    },
    Secondary: {
        primary: "#CF02AB",
        light: "rgba(159, 1, 132, .1)",
        dark: "rgba(159, 1, 132, .2)",
    },
};

const getCategoryColors = (category) =>
    categoryColorMap[category] || {
        primary: "#6C757D",
        light: "#E9ECEF",
        dark: "#343A40",
    };

export default function FeeGradeSelection() {
    const navigate = useNavigate()
    const grades = useSelector(selectGrades);

    const groupedGrades = grades.reduce((acc, item) => {
        const category = item.category || "Others";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const handleClick = (grade, gradeId) => {
        navigate("/dashboardmenu/student/fee/categories", { state: { grade, gradeId } });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    backgroundColor: "#f2f2f2",
                    py: 1.5,
                    px: 2,
                    borderRadius: "10px 10px 10px 0px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                }}
            >
                <Link to={"/dashboardmenu/student/fee"}>
                    <IconButton sx={{ width: "27px", height: "27px", marginTop: '2px' }}>
                        <ArrowBackIcon sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                </Link>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "19px",
                    }}
                >
                    Create Fee Structures by Grade
                </Typography>

            </Box>
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        px: 2,
                        py: 2,
                        borderRadius: "15px",
                        border: "1px solid #ccc"

                    }}
                >
                    <Box sx={{
                        height: "75vh",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}>
                        {Object.entries(groupedGrades).map(([category, items]) => {
                            const { primary } = getCategoryColors(category);

                            return (
                                <Box key={category} sx={{ mb: 1 }}>
                                    {/* Category Heading */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "10px",
                                                height: "10px",
                                                backgroundColor: primary,
                                                borderRadius: "50%",
                                                mr: 1
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "16px",
                                                color: "#000",
                                            }}
                                        >
                                            {category}
                                        </Typography>
                                    </Box>

                                    {/* Items in Category */}
                                    <Grid container spacing={3}>
                                        {items.map((item, index) => {
                                            const { light, dark } = getCategoryColors(item.category);

                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                    key={index}
                                                    sx={{ display: "flex", justifyContent: "center" }}
                                                >
                                                    <Box
                                                        onClick={() => handleClick(item.sign, item.id)}
                                                        sx={{ cursor: "pointer", textDecoration: "none", width: "100%" }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                backgroundColor: light,
                                                                width: "100%",
                                                                height: "60px",
                                                                py: 2,
                                                                mb: 2,
                                                                position: "relative",
                                                                borderRadius: "7px",
                                                                cursor: "pointer",
                                                                "&:hover": {
                                                                    ".arrowIcon": {
                                                                        opacity: 1,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: "7px",
                                                                    backgroundColor: primary,
                                                                    height: "100%",
                                                                    position: "absolute",
                                                                    left: 0,
                                                                    top: 0,
                                                                    borderTopLeftRadius: "5px",
                                                                    borderBottomLeftRadius: "5px",
                                                                }}
                                                            />
                                                            <Grid
                                                                container
                                                                spacing={1}
                                                                sx={{ height: "100%", px: 2 }}
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={3}
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            backgroundColor: dark,
                                                                            borderRadius: "50%",
                                                                            width: "40px",
                                                                            height: "40px",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                        }}
                                                                    >
                                                                        <NewspaperIcon sx={{ color: primary }} width={25} height={25} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={5}
                                                                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "600",
                                                                            color: "#000",
                                                                        }}
                                                                    >
                                                                        {item.sign}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={3}
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "end"
                                                                    }}
                                                                >
                                                                    <AddIcon
                                                                        className="arrowIcon"
                                                                        sx={{
                                                                            opacity: 0,
                                                                            fontSize: "28px",
                                                                            fontWeight: "700",
                                                                            transition: "opacity 0.3s ease",
                                                                            color: primary,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
