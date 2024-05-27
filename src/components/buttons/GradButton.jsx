import { Button } from "@mui/material";
import React, { useState } from "react";

function GradButton({ children, index }) {
    return (
        <Button
            variant="contained"
            sx={{
                background:
                    index % 2 === 1 ? "rgb(199,204,241)" : " rgb(84,121,191)",
                background:
                    index % 2 === 1
                        ? "linear-gradient(180deg, rgba(199,204,241,1) 0%, rgba(229,232,255,1) 90%)"
                        : "linear-gradient(180deg, rgba(84,121,191,1) 0%, rgba(114,147,210,1) 90%)",
                borderRadius: "100px",
                border:
                    index % 2 === 1
                        ? "1px solid #C7CCF1"
                        : "1px solid rgb(84,121,191)",

                padding: "2px 10px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "lowercase",
                color: index % 2 === 1 ? "rgba(0,0,0,.8)" : "#fff",
                // "&:hover": {
                //     // background: "transparent",
                // },
            }}
        >
            {children}
        </Button>
    );
}

export default GradButton;
