import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import WordDetails from "./WordDetails";
import DOMPurify from "dompurify";
import ChildModal from "./modals/ChildModal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EditBox({ setOpen, open, rowData }) {
    // const [rowData, setRowData] = useState();
    // console.log(rowData, "rowdata");
    const handleClose = () => {
        setOpen(false);
    };

    function createMarkup() {
        return { __html: rowData?.obj.phonetics };
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    maxWidth: "635px",
                    margin: "0 auto",
                }}
            >
                <DialogTitle
                    component={"div"}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <Typography variant="h3">{rowData?.name}</Typography>

                        <Typography
                            sx={{ color: "rgba(0,0,0,0.6)" }}
                            component={"div"}
                        >
                            <div
                                style={{
                                    fontSize: "16px",
                                    color: "rgba(0,0,0,0.6)",
                                }}
                                dangerouslySetInnerHTML={createMarkup()}
                            />
                        </Typography>
                    </div>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="subtitle1">
                            <b>{rowData?.totalMeanings}</b> meanings{" "}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{rowData?.totalSynonyms}</b> synonyms
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        sx={{ width: "100%" }}
                    >
                        {rowData?.obj.definitions.map((define, index) => {
                            return (
                                <>
                                    <WordDetails
                                        index={index}
                                        define={define}
                                    />
                                </>
                            );
                        })}
                        {/* <WordDetails index={1} />
                        <WordDetails index={2} /> */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{ backgroundColor: "transparent", padding: 2 }}
                >
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

                    <ChildModal wordName={rowData?.name} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default EditBox;
