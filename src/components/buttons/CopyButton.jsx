import React from "react";

import { SnackbarProvider, useSnackbar } from "notistack";
import { ContentCopy } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function CopyButton({ word }) {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        navigator.clipboard.writeText(word);
        enqueueSnackbar(`${word} Copied`, { variant });
    };
    return (
        <IconButton size="small" onClick={handleClickVariant("default")}>
            <ContentCopy fontSize="24px" />
        </IconButton>
    );
}

export default CopyButton;
