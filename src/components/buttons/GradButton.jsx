import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Check } from "@mui/icons-material";
function GradButton({ children, index, tag }) {
    const handleRemove = () => {
        alert("remove clicked");
    };
    return (
        <>
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
                {children}
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
                    />
                )}
            </Button>
        </>
    );
}

export default GradButton;
