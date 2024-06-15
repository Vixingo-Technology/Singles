import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Chip, TextField } from "@mui/material";
import { WordContext } from "../../contexts/WordContext";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "12px",
};

export default function ChildModal({ wordName, setOpen1, open1 }) {
    const { editSum, setEditSum, changes } = React.useContext(WordContext);
    const [open, setOpen] = React.useState(false);
    const [conValue, setConValue] = React.useState("");
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
    };

    const handleChange = (e) => {};

    const [addedArray, setAddedArray] = React.useState([""]);
    const { removed, setRemoved } = React.useContext(WordContext);
    const [WordDetails, setWordDetails] = React.useState();

    // const findWord = (wordName) => {
    //     fetch(`https://api.datamuse.com/words?rel_rhy=${wordName}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data, "data");
    //             setWordDetails(data);
    //         });
    // };

    const [finalValue, setFinalValue] = React.useState(
        `ADDED:\nSynonyms:\n${JSON.stringify(
            changes.added.toString()
        )}\nREMOVED: \n${JSON.stringify(changes.deleted.toString())}\n\nEDITED`
    );

    React.useEffect(() => {
        // findWord(wordName);
        console.log(changes, "changes");
    }, [wordName]);

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                sx={{
                    width: "100%",
                    borderRadius: "100px",
                    color: "#6750A4",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px 1px #999999",
                }}
            >
                Save
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 430 }}>
                    <Box sx={{ textAlign: "center" }}>
                        <Chip
                            label={wordName}
                            variant="outlined"
                            sx={{
                                color: "#203BC8",
                                fontSize: "18px",
                                padding: "2px 10px",
                                fontWeight: "bold",
                            }}
                        />
                    </Box>
                    <Box sx={{ py: 3 }}>
                        <TextField
                            variant="outlined"
                            label="Edit Summary"
                            multiline
                            rows={6}
                            fullWidth
                            value={finalValue}
                            onChange={(e) => {
                                setFinalValue(e.target.value);
                            }}
                        />
                    </Box>
                    <Box sx={{ textAlign: "center", pb: 3 }}>
                        <input
                            placeholder="Retype word to confirm"
                            style={{
                                padding: "2px 10px",
                                border: "1px solid #999999",
                                borderRadius: "4px",
                            }}
                            onChange={(e) => {
                                setConValue(e.target.value);
                            }}
                            value={conValue}
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                width: "100%",
                                borderRadius: "100px",
                                color: "#625B71",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px 1px #999999",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleClose}
                            color="primary"
                            variant="contained"
                            disabled={conValue === wordName ? false : true}
                            sx={{
                                width: "100%",
                                borderRadius: "100px",
                                // color: "#625B71",
                                // backgroundColor: "#fff",

                                boxShadow: "0 2px 4px 1px #999999",
                            }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
