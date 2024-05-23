import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Slide from "@mui/material/Slide";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import {
    AddCircleOutline,
    Adjust,
    Checklist,
    ContentCopy,
    Menu,
    OpenInNew,
    Visibility,
} from "@mui/icons-material";
import GradButton from "./buttons/GradButton";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import WordDetails from "./WordDetails";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SingleTable() {
    const totalWords = 12039;

    const total_results = 50;
    const [start_word, setStart_word] = React.useState("bar");
    const api = "https://api-zcg7jiz4mq-uc.a.run.app/words";

    const [mod, setMod] = React.useState("opened");
    const [adjust, setAdjust] = React.useState(true);
    const [words, setWords] = React.useState([]);

    const getwords = () => {
        const queryParam = "?offset=" + start_word + "&limit=" + total_results;
        const finalURL = api + queryParam;

        axios
            .get(finalURL)
            .then((res) => {
                const apiRes = res?.data.words;
                const margeData = [...words, ...apiRes];
                setWords(margeData);
                setStart_word(apiRes[apiRes.length - 1].name);
            })
            .catch((err) => {
                console.log("error while loading words", err);
            });
    };

    React.useEffect(() => {
        getwords();
        console.log(words);
    }, []);

    const fetchMoreData = () => {
        getwords();
    };

    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <InfiniteScroll
                dataLength={words.length}
                next={fetchMoreData}
                hasMore={words.length < totalWords}
                loader={<h4>Loading...</h4>}
            >
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="single table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ fontWeight: "500", paddingLeft: 5 }}
                                >
                                    Word
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 110 }}
                                >
                                    Word Rank
                                </TableCell>
                                <TableCell sx={{ fontWeight: "500" }}>
                                    #Syn
                                </TableCell>
                                <TableCell sx={{ fontWeight: "500" }}>
                                    #Meanings
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 100 }}
                                >
                                    # Syn <br /> 1st Mean
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 100 }}
                                >
                                    # Syn <br /> 2nd Mean
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 100 }}
                                >
                                    # Syn <br /> 3rd Mean
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 100 }}
                                >
                                    # Syn <br /> 4th Mean
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: "500", width: 110 }}
                                >
                                    # Syn <br /> Last Mean
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "500" }}
                                >
                                    Opened/ Modified
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "500" }}
                                >
                                    Adjust Synonym(s)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {words.map((row) => (
                                <TableRow
                                    key={row.name}
                                    className={"group"}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <div
                                            style={{
                                                display: "flex",
                                                width: 190,
                                                alignItems: "center",
                                            }}
                                        >
                                            <IconButton
                                                size="small"
                                                className="invisible group-hover:visible "
                                                onClick={handleClickOpen}
                                            >
                                                <OpenInNew
                                                    color="primary"
                                                    fontSize="24px"
                                                />
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    flex: 1,
                                                    color: "rgba(0,0,0,87)",
                                                    fontWeight: 400,
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {row.name}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                className="invisible group-hover:visible"
                                            >
                                                <ContentCopy fontSize="24px" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.rank}
                                    </TableCell>
                                    <TableCell align="center">190</TableCell>
                                    <TableCell align="center">
                                        {row.definitions.length}
                                    </TableCell>
                                    <TableCell align="left">
                                        20{" "}
                                        <span style={{ color: "#219653" }}>
                                            Verb
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        15{" "}
                                        <span style={{ color: "#219653" }}>
                                            Verb
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        10{" "}
                                        <span style={{ color: "#219653" }}>
                                            Noun
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        10{" "}
                                        <span style={{ color: "#219653" }}>
                                            Noun
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">
                                        15{" "}
                                        <span style={{ color: "#219653" }}>
                                            Noun
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {" "}
                                        {mod === "opened" ? (
                                            <Visibility color="warning" />
                                        ) : mod === "modified" ? (
                                            <Checklist color="primary" />
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {adjust ? (
                                            <Adjust
                                                style={{ color: "#B3261E" }}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InfiniteScroll>
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
        </>
    );
}

export default SingleTable;
