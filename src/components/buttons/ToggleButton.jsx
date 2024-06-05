import { Check } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";

function ToggleButton({ children, setType, type }) {
    const [check, setCheck] = useState(false);
    const handleClick = () => {
        setCheck(!check);
        setType([...type, children]);
    };

    return (
        <>
            <Button
                variant="contained"
                color={"primary"}
                sx={{
                    borderRadius: "8px",
                    backgroundColor: check
                        ? "#6750A4"
                        : "rgba(103, 80,164, 40%)",
                    color: check ? "#fff" : "#625B71",
                    "&:hover": {
                        color: "#fff",
                    },
                }}
                startIcon={check ? <Check /> : ""}
                size="small"
                onClick={handleClick}
            >
                {children}
            </Button>
        </>
    );
}

export default ToggleButton;
