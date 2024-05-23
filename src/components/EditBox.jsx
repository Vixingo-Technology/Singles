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
import React from "react";
import WordDetails from "./WordDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EditBox({ setOpen, open }) {
    const handleClose = () => {
        setOpen(false);
    };
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
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        {" "}
                        <Typography variant="h3">hit</Typography>
                        <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                            / hit /
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="subtitle1">
                            <b>13</b> meanings{" "}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>190</b> synonyms
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        sx={{ width: "100%" }}
                    >
                        <WordDetails index={0} />
                        <WordDetails index={1} />
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
                    <Button
                        onClick={handleClose}
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
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default EditBox;
