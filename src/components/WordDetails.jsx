import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
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
import { deleteDefinition } from "../api/api";
import { WordContext } from "../contexts/WordContext";

function WordDetails({ index, define, onDeleteDefinition, wordName }) {
    const { setWords } = useContext(WordContext);

    // const [define, setDefine] = useState(def);
    const [editing, setEditing] = useState(false);
    const { editSum, setEditSum } = useContext(WordContext);

    const handleEditing = () => {
        setEditing(!editing);
    };

    const [group, setGroup] = useState({
        pos: define?.part_of_speech,
        meaning: define?.meaning,
    });

    // Adding new words
    const [newWord, setNewWord] = useState(false);
    const [newValue, setNewValue] = useState();

    const handleBlur = () => {
        setNewWord(!newWord);
        setNewValue(null);
    };

    const handleChange = (e) => {
        setNewValue(e.target.value);
    };

    const handleUpdatedWordKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSaveUpdatedWord();
        }
    };
    const handleSaveUpdatedWord = () => {
        define.synonyms.push({ word: newValue, color: "white" });
        setNewWord(!newWord);
        setNewValue(null);
        setEditSum(...newValue);
    };
    // Update defination

    // const handleUpdateSubmit = (e) => {
    //     e.preventDefault();
    //     onUpdateDefinition(updateDefinitionId, {
    //         meaning: updateMeaning,
    //         part_of_speech: updatePartOfSpeech,
    //     });
    //     setUpdateDefinitionId("");
    //     setUpdateMeaning("");
    //     setUpdatePartOfSpeech("");
    // };

    const updateDefinition = (wordName, definitionId, newDefinition) => {
        setWords((prevWords) => {
            return prevWords.map((word) => {
                if (word.name === wordName) {
                    return {
                        ...word,
                        definitions: word.definitions.map((definition) => {
                            if (definition.id === definitionId) {
                                return {
                                    ...definition,
                                    ...newDefinition,
                                };
                            }
                            return definition;
                        }),
                    };
                }
                return word;
            });
        });
    };

    const handleUpdateDefinition = () => {
        const newDefinition = {
            meaning: group.meaning,
            part_of_speech: group.pos,
            // synonyms: [
            // ],
        };
        updateDefinition(wordName, define.id, newDefinition);
        setEditing(!editing);
    };

    // delete defination

    const handleDelete = (definitionId) => {
        onDeleteDefinition(definitionId);
    };

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
                        onClick={() => handleDelete(define?.id)}
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
                            <IconButton
                                onClick={() => {
                                    handleUpdateDefinition;
                                }}
                            >
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
                        {define?.synonyms?.map((synonym) => {
                            return (
                                <GradButton
                                    index={index}
                                    key={synonym.id}
                                    tag={synonym?.color}
                                    wordName={wordName}
                                >
                                    {synonym?.word}
                                </GradButton>
                            );
                        })}

                        {newWord ? (
                            <input
                                style={{
                                    border: "1px solid #200",
                                    borderRadius: "16px",
                                    padding: "2px 10px",
                                    maxWidth: 90,
                                }}
                                placeholder="Word"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={newValue}
                                onKeyPress={handleUpdatedWordKeyPress}
                            />
                        ) : (
                            <IconButton
                                size="small"
                                sx={{ p: 0 }}
                                onClick={() => {
                                    setNewWord(!newWord);
                                }}
                            >
                                <AddCircleOutline
                                    fontSize="medium"
                                    color="primary"
                                />
                            </IconButton>
                        )}
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
