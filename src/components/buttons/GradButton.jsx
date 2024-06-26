import { Button, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Check } from "@mui/icons-material";
import { WordContext } from "../../contexts/WordContext";
function GradButton({ children, index, tag, wordName }) {
    const { setWords, setRemoved, removed, changes, setChanges } =
        useContext(WordContext);

    const [value, setValue] = useState(children);

    const handleRemove = () => {
        // remove the tag from the array
        removeSynonym(wordName, children);
        alert(children + " removed");
        setValue(null);
        setRemoved(children);
    };

    const removeSynonym = (wordName, synonymWord) => {
        setWords((prevWords) => {
            return prevWords.map((word) => {
                if (word.name === wordName) {
                    return {
                        ...word,
                        definitions: word.definitions.map((definition) => {
                            return {
                                ...definition,
                                synonyms: definition.synonyms.filter(
                                    (synonym) => synonym.word !== synonymWord
                                ),
                            };
                        }),
                    };
                }
                return word;
            });
        });
        changes.deleted.push(synonymWord);
        console.log(changes);
    };
    return (
        <>
            {" "}
            {value ? (
                <Button
                    variant="contained"
                    className="group"
                    sx={{
                        background:
                            tag === "white"
                                ? "white"
                                : index % 2 === 1
                                ? "rgb(199,204,241)"
                                : " rgb(84,121,191)",
                        background:
                            tag === "white"
                                ? "white"
                                : index % 2 === 1
                                ? "linear-gradient(180deg, rgba(199,204,241,1) 0%, rgba(229,232,255,1) 90%)"
                                : "linear-gradient(180deg, rgba(84,121,191,1) 0%, rgba(114,147,210,1) 90%)",
                        borderRadius: "100px",
                        border:
                            tag === "white"
                                ? "1px solid red"
                                : index % 2 === 1
                                ? "1px solid #C7CCF1"
                                : "1px solid rgb(84,121,191)",

                        padding: "2px 10px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textTransform: "lowercase",
                        color:
                            tag === "white"
                                ? " red"
                                : index % 2 === 1
                                ? "rgba(0,0,0,.8)"
                                : "#fff",
                        "&:hover": {
                            background: "transparent",
                            color: "#000",
                            border:
                                tag === "white"
                                    ? "1px solid red"
                                    : "1px solid #000",

                            "&:hover .removeIcon": {
                                display: "block",
                                color: "red",
                            },
                        },
                    }}
                >
                    {value}
                    {tag === "white" ? (
                        <button onClick={handleRemove} size="small">
                            <RemoveCircleOutlineIcon
                                color="error"
                                sx={{ position: "relative", right: -6 }}
                            />
                        </button>
                    ) : (
                        <RemoveCircleOutlineIcon
                            className="removeIcon"
                            sx={{
                                display: "none",
                                position: "relative",
                                right: -6,
                                "&:hover": {
                                    color: "red",
                                },
                            }}
                            onClick={handleRemove}
                        />
                    )}
                </Button>
            ) : (
                ""
            )}
        </>
    );
}

export default GradButton;
