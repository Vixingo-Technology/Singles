import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Search } from "@mui/icons-material";
import ToggleButton from "./buttons/ToggleButton";
import SingleTable from "./SingleTable";
import DataTable from "./DataTable";
function Singles() {
    return (
        <>
            <Box sx={{ maxWidth: "1000px", margin: "0 auto" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            All Words
                        </Typography>
                        <Typography variant="subtitle2">
                            Displaying <b style={{ color: "#000" }}> 12,039</b>{" "}
                            matches
                        </Typography>
                    </Box>
                    <Box>
                        {" "}
                        <Box
                            sx={{
                                maxHeight: "38px",
                                maxWidth: "400px",
                                mb: 1,
                            }}
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Search for a word"
                                size="small"
                                fullWidth
                                sx={{
                                    backgroundColor: "#F0F3F6",
                                    borderRadius: "8px",
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: "#000" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                            />
                        </Box>{" "}
                        <Box sx={{ display: "flex", gap: "12px" }}>
                            <ToggleButton>Nouns</ToggleButton>
                            <ToggleButton>Verb</ToggleButton>
                            <ToggleButton>Adj</ToggleButton>
                            <ToggleButton>Adv</ToggleButton>
                            <ToggleButton>Other</ToggleButton>
                        </Box>
                    </Box>
                </Box>
                <SingleTable />
                <DataTable />
            </Box>
        </>
    );
}

export default Singles;
