import { Check, CloseRounded } from "@mui/icons-material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { createDefinition } from "../../api/api";
import { WordContext } from "../../contexts/WordContext";
function NewMeaningGroup({ wordName, define }) {
    const { setWords } = useContext(WordContext);
    const [editing, setEditing] = useState(false);
    const [group, setGroup] = useState({
        part_of_speech: "",
        meaning: "",
    });

    // const handleCreateDefinition = async (word, definition) => {
    //     define.push(definition);
    //     setGroup({ part_of_speech: "", meaning: "" });
    //     setEditing(!editing);
    //     const data = await createDefinition(word, definition);
    //     // console.log(data);
    // };

    const addDefinition = (wordName, newDefinition) => {
        define.push(newDefinition);
        setWords((prevWords) => {
            return prevWords.map((word) => {
                if (word.name === wordName) {
                    return {
                        ...word,
                        definitions: [...word.definitions, newDefinition],
                    };
                }
                return word;
            });
        });
    };

    // Example of adding a new definition to the word "boy"
    const newDefinition = {
        id: "99999",
        meaning: group.meaning,
        part_of_speech: group.part_of_speech,
        synonyms: [
            // { id: "12345", word: "kid", color: "Orange" },
        ],
    };

    const handleAddDefinition = (wordName) => {
        addDefinition(wordName, newDefinition);
        setEditing(!editing);
        setGroup({ part_of_speech: "", meaning: "" });
    };

    return (
        <Box sx={{ position: "relative" }}>
            <Button
                size="small"
                variant="outlined"
                sx={{ borderRadius: "16px", fontWeight: "600" }}
                onClick={() => {
                    setEditing(!editing);
                }}
            >
                <ControlPointRoundedIcon
                    sx={{ position: "relative", left: -4 }}
                />{" "}
                Meaning Group
            </Button>

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
                    value={group.part_of_speech}
                    onChange={(e) => {
                        setGroup({ ...group, part_of_speech: e.target.value });
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
                            setGroup({ part_of_speech: "", meaning: "" });
                        }}
                    >
                        <CloseRounded />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            handleAddDefinition(wordName);
                        }}
                    >
                        <Check color="primary" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default NewMeaningGroup;
