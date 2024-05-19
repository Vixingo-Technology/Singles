import { Button } from "@mui/material";
import React from "react";

function GLButton({ children }) {
    return (
        <Button
            variant="contained"
            sx={{
                background: "rgb(199,204,241)",
                background:
                    "linear-gradient(180deg, rgba(199,204,241,1) 0%, rgba(229,232,255,1) 90%)",
                borderRadius: "100px",
                border: "1px solid #C7CCF1",
                padding: "2px 10px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "lowercase",
                color: "rgba(0,0,0,.8)",
            }}
        >
            {children}
        </Button>
    );
}

export default GLButton;
