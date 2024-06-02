import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import GradButton from "./buttons/GradButton";
import {
    AddCircleOutline,
    Check,
    CloseRounded,
    Delete,
    Edit,
    Menu,
} from "@mui/icons-material";
import GLButton from "./buttons/GLButton";
import ChildModal from "./modals/ChildModal";

function WordDetails({ index, define }) {
    const [editing, setEditing] = useState(false);

    const handleEditing = () => {
        setEditing(!editing);
    };

    const [group, setGroup] = useState({
        pos: define?.part_of_speech,
        meaning: define?.meaning,
    });

    return (
        <>
            <Box sx={{ mb: 2 }}>
                {" "}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                    }}
                    className="group"
                >
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            fontWeight: 400,
                        }}
                    >
                        {define?.part_of_speech}
                    </Typography>
                    <Typography
                        sx={{ color: "rgba(0,0,0,0.87)", fontWeight: "600" }}
                    >
                        {" "}
                        &nbsp;{define?.meaning}
                    </Typography>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                        onClick={handleEditing}
                    >
                        <Edit fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                        size="small"
                        className="invisible group-hover:visible"
                    >
                        <Delete fontSize="small" color="error" />
                    </IconButton>

                    <Box
                        sx={{
                            display: editing ? "flex" : "none",
                            position: "absolute",
                            left: 0,
                            top: 35,
                            borderRadius: "16px",
                            boxShadow: 2,
                            bgcolor: "#fff",
                            zIndex: 10,
                            width: "350px",
                            flexDirection: "column",
                            gap: 1,
                            padding: "12px",
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Parts of Speech"
                            variant="outlined"
                            size="small"
                            value={group.pos}
                            onChange={(e) => {
                                setGroup({ ...group, pos: e.target.value });
                            }}
                            sx={{
                                width: "130px",
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Meaning"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={group.meaning}
                            onChange={(e) => {
                                setGroup({ ...group, meaning: e.target.value });
                            }}
                        />
                        <Box sx={{ textAlign: "center" }}>
                            <IconButton
                                onClick={() => {
                                    setEditing(!editing);
                                }}
                            >
                                <CloseRounded />
                            </IconButton>
                            <IconButton>
                                <Check color="primary" />
                            </IconButton>
                        </Box>
                    </Box>
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
                        {define?.synonyms.map((synonym) => {
                            return (
                                <GradButton index={index}>
                                    {synonym.word}
                                </GradButton>
                            );
                        })}

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
        </>
    );
}

export default WordDetails;
