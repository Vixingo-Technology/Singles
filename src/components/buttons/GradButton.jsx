import { Button } from "@mui/material";
import React, { useState } from "react";

function GradButton({ children, index }) {
    return (
        <Button
            variant="contained"
            sx={{
                background: " rgb(84,121,191)",
                background:
                    "linear-gradient(180deg, rgba(84,121,191,1) 0%, rgba(114,147,210,1) 90%)",
                borderRadius: "100px",
                border: "1px solid rgb(84,121,191)",

                padding: "2px 10px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "lowercase",
                color: "#fff",
            }}
        >
            {children}
        </Button>
    );
}

export default GradButton;
