import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import axios from "axios";
import { IconButton, Typography } from "@mui/material";
import {
    Checklist,
    ContentCopy,
    OpenInNew,
    Visibility,
} from "@mui/icons-material";
import EditBox from "./EditBox";

import CopyButton from "./buttons/CopyButton";
import { WordContext } from "../contexts/WordContext";

function createData(
    name,
    rank,
    totalSynonyms,
    totalMeanings,
    totalFirstPositionSynonyms,
    totalSecondPositionSynonyms,
    totalThirdPositionSynonyms,
    totalForthPositionSynonyms,
    totalFifthPositionSynonyms,
    obj
) {
    return {
        name,
        rank,
        totalSynonyms,
        totalMeanings,
        totalFirstPositionSynonyms,
        totalSecondPositionSynonyms,
        totalThirdPositionSynonyms,
        totalForthPositionSynonyms,
        totalFifthPositionSynonyms,
        obj,
    };
}

const columns = [
    {
        width: 140,
        label: "Word",
        dataKey: "name",
    },
    {
        width: 90,
        label: "Word Rank",
        dataKey: "rank",
    },
    {
        width: 70,
        label: "# Syn",
        dataKey: "totalSynonyms",
    },
    {
        width: 90,
        label: "# Meanings",
        dataKey: "totalMeanings",
    },
    {
        width: 90,
        label: "# 1st mean",
        dataKey: "totalFirstPositionSynonyms",
    },
    {
        width: 90,
        label: "# 2nd mean",
        dataKey: "totalSecondPositionSynonyms",
    },
    {
        width: 100,
        label: "# 3rd mean",
        dataKey: "totalThirdPositionSynonyms",
    },
    {
        width: 90,
        label: "# 4th mean",
        dataKey: "totalForthPositionSynonyms",
    },
    {
        width: 90,
        label: "# last mean",
        dataKey: "totalFifthPositionSynonyms",
    },
    {
        width: 70,
        label: "Opened/Modified ",
        dataKey: "Mod",
    },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table
            {...props}
            sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => (
        <TableRow
            {...props}
            sx={{
                "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                },
            }}
            className="group"
        />
    ),
    TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? "right" : "left"}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: "background.paper",
                        fontWeight: "500",
                        fontSize: "14px",
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default function VirtualTable({ words }) {
    const [mod, setMod] = React.useState("");
    const [adjust, setAdjust] = React.useState(true);

    const rows = words.map((w) => {
        const totalSynonyms = w.definitions
            .map((definition) => definition.synonyms?.length)
            .reduce((acc, count) => acc + count, 0);
        // total meaning
        const totalMeanings = w.definitions.length;

        // Check if a second definition exists
        let totalFirstPositionSynonyms;

        if (w.definitions[0]) {
            let Definition = w.definitions[0];
            let partOfSpeech = Definition.part_of_speech;
            let totalSynonyms = Definition.synonyms.length;
            totalFirstPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        } else {
            totalFirstPositionSynonyms = 0;
        }
        // Check if a second definition exists
        let totalSecondPositionSynonyms;

        if (w.definitions[1]) {
            let Definition = w.definitions[1];
            let partOfSpeech = Definition.part_of_speech;
            let totalSynonyms = Definition.synonyms?.length;
            totalSecondPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        } else {
            totalSecondPositionSynonyms = 0;
        }
        // Check if a Third definition exists
        let totalThirdPositionSynonyms;

        if (w.definitions[2]) {
            let Definition = w.definitions[2];
            let partOfSpeech = Definition.part_of_speech;
            let totalSynonyms = Definition.synonyms?.length;
            totalThirdPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        } else {
            totalThirdPositionSynonyms = 0;
        }

        // Check if a Forth definition exists
        let totalForthPositionSynonyms;

        if (w.definitions[3]) {
            let Definition = w.definitions[3];
            let partOfSpeech = Definition.part_of_speech;
            let totalSynonyms = Definition.synonyms?.length;
            totalForthPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        } else {
            totalForthPositionSynonyms = 0;
        }
        // Check if a Fifth definition exists
        let totalFifthPositionSynonyms;

        if (w.definitions[4]) {
            let Definition = w.definitions[4];
            let partOfSpeech = Definition.part_of_speech;
            let totalSynonyms = Definition.synonyms?.length;
            totalFifthPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        } else {
            totalFifthPositionSynonyms = 0;
        }

        return createData(
            w.name,
            w.rank,
            totalSynonyms,
            totalMeanings,
            totalFirstPositionSynonyms,
            totalSecondPositionSynonyms,
            totalThirdPositionSynonyms,
            totalForthPositionSynonyms,
            totalFifthPositionSynonyms,
            w
        );
    });

    //dialog
    const [open, setOpen] = React.useState(false);
    const [rowData, setRowData] = React.useState();
    const { defOrder, setDefOrder } = React.useContext(WordContext);

    const handleClickOpen = (row) => {
        setOpen(true);
        setRowData(row);
        // setMod("opened");
        setDefOrder(transformArray);
    };

    React.useEffect(() => {
        const transformArray = () => {
            return rowData?.obj.definitions.map((_, index) => index + 1);
        };
    });

    // Row content
    function rowContent(_index, row) {
        return (
            <React.Fragment>
                <TableCell>
                    <div
                        style={{
                            display: "flex",
                            width: 170,
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            size="small"
                            className="invisible group-hover:visible "
                            onClick={() => {
                                handleClickOpen(row);
                                // setdefOrder(rowData?.obj.definitions)
                            }}
                        >
                            <OpenInNew color="primary" fontSize="24px" />
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
                        <div className="invisible group-hover:visible">
                            <CopyButton word={row.name} />
                        </div>
                    </div>
                </TableCell>
                {columns.slice(1, 9).map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? "right" : "left"}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
                <TableCell key={row.id}>
                    {mod === "opened" ? (
                        <Visibility color="warning" />
                    ) : mod === "modified" ? (
                        <Checklist color="primary" />
                    ) : (
                        ""
                    )}
                </TableCell>
            </React.Fragment>
        );
    }

    return (
        <Paper style={{ height: 510, width: "100%" }}>
            <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
            />
            <EditBox open={open} setOpen={setOpen} rowData={rowData} />
        </Paper>
    );
}
