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
import React, { useContext, useEffect, useState } from "react";
import WordDetails from "./WordDetails";
import DOMPurify from "dompurify";
import ChildModal from "./modals/ChildModal";
import NewMeaningGroup from "./buttons/NewMeaningGroup";
import { Reorder } from "framer-motion";
import { WordContext } from "../contexts/WordContext";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EditBox({ setOpen1, open1, rowData }) {
    // const [rowData, setRowData] = useState();
    // console.log(rowData, "rowdata");
    const { words, setWords } = useContext(WordContext);

    const handleClose = () => {
        setOpen1(false);
    };

    function createMarkup() {
        return { __html: rowData?.obj.phonetics };
    }
    // Delete a group
    const handleDeleteDefinition = async (definitionId) => {
        await deleteDefinition(definitionId);
        const updatedWord = await getWord(selectedWord.name);
        setSelectedWord(updatedWord.word);
    };

    // reorder
    const { setDefOrder, defOrder } = useContext(WordContext);

    // const [defCount, setDefCount] = useState([1, 2, 3, 4]);

    // useEffect(() => {
    //     const transformArray = () => {
    //         return rowData?.obj.definitions.map((_, index) => index + 1);
    //     };
    //     console.log(transformArray(), "eb");
    //     setDefCount(transformArray());
    //     // setDefOrder(transformArray());
    // });
    return (
        <React.Fragment>
            <Dialog
                open={open1}
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
                        component={Box}
                    >
                        <Reorder.Group
                            values={defOrder}
                            onReorder={setDefOrder}
                            axis="y"
                        >
                            {rowData?.obj.definitions.map((define, index) => {
                                return (
                                    <>
                                        <Reorder.Item
                                            key={index}
                                            value={define}
                                        >
                                            <WordDetails
                                                index={index}
                                                define={define}
                                                wordName={rowData.name}
                                                onDeleteDefinition={
                                                    handleDeleteDefinition
                                                }
                                            />
                                        </Reorder.Item>
                                    </>
                                );
                            })}
                        </Reorder.Group>
                        {/* <WordDetails index={1} />
                        <WordDetails index={2} /> */}
                    </DialogContentText>
                    <NewMeaningGroup
                        wordName={rowData?.name}
                        define={rowData?.obj.definitions}
                    />
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

                    <ChildModal
                        wordName={rowData?.name}
                        rowData={rowData}
                        open1={open1}
                        setOpen1={setOpen1}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default EditBox;
