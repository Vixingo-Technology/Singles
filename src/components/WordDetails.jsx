import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import GradButton from "./buttons/GradButton";
import { AddCircleOutline, Delete, Edit, Menu } from "@mui/icons-material";
import GLButton from "./buttons/GLButton";

function WordDetails({ index }) {
    return (
        <>
            <Box sx={{ mb: 2 }}>
                {" "}
                <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="group"
                >
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            fontWeight: 400,
                        }}
                    >
                        noun
                    </Typography>
                    <Typography> &nbsp;strike, bump</Typography>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                    >
                        <Edit fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                    >
                        <Delete fontSize="small" color="error" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",

                        justifyContent: "space-between",
                    }}
                >
                    {" "}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            my: 1.5,
                        }}
                    >
                        <GradButton>Bat</GradButton>
                        <GradButton>blow</GradButton>
                        <GradButton>blow</GradButton>

                        <GradButton>punch</GradButton>
                        <GradButton>shot</GradButton>
                        <GradButton>punch</GradButton>
                        <GradButton>shot</GradButton>
                        <IconButton size="small" sx={{ p: 0 }}>
                            <AddCircleOutline
                                fontSize="medium"
                                color="primary"
                            />
                        </IconButton>
                    </Box>
                    <Box mt={1}>
                        <IconButton>
                            <Menu color="primary" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>{" "}
            <Box sx={{ mb: 2 }}>
                {" "}
                <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    className="group"
                >
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            fontWeight: 400,
                        }}
                    >
                        noun
                    </Typography>
                    <Typography> &nbsp;strike, bump</Typography>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                    >
                        <Edit fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                    >
                        <Delete fontSize="small" color="error" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: "flex",

                        justifyContent: "space-between",
                    }}
                >
                    {" "}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            my: 1.5,
                        }}
                    >
                        <GLButton>Winner</GLButton>
                        <GLButton>shot</GLButton>
                        <GLButton>Smash</GLButton>
                        <IconButton size="small" sx={{ p: 0 }}>
                            <AddCircleOutline
                                fontSize="medium"
                                color="primary"
                            />
                        </IconButton>
                    </Box>
                    <Box mt={1}>
                        <IconButton>
                            <Menu color="primary" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default WordDetails;
