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
import { ContentCopy, OpenInNew } from "@mui/icons-material";
import EditBox from "./EditBox";

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
        width: 80,
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
    {
        width: 70,
        label: "Adjust Synonym(s)",
        dataKey: "adjust",
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

export default function VirtualTable({}) {
    const totalWords = 12039;

    const total_results = 50;
    const [start_word, setStart_word] = React.useState("A");
    const api = "https://api-zcg7jiz4mq-uc.a.run.app/words";

    const [mod, setMod] = React.useState("opened");
    const [adjust, setAdjust] = React.useState(true);
    const [words, setWords] = React.useState([]);

    // API calling
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
        // console.log(words[0].name);
    });

    const fetchMoreData = () => {
        getwords();
    };

    // table setting
    // const rows = Array.from({ length: 200 }, (_, index) => {
    //     // const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    //     // console.log(words[index]);

    //     return createData(index, ...tableData);
    // });

    const rows = words.map((w) => {
        const totalSynonyms = w.definitions
            .map((definition) => definition.synonyms.length)
            .reduce((acc, count) => acc + count, 0);
        // total meaning
        const totalMeanings = w.definitions.length;

        const totalFirstPositionSynonyms = w.definitions[0].synonyms.length;

        const totalSecondPositionSynonyms = w.definitions[1]
            ? w.definitions[1].synonyms.length
            : 0;

        const totalThirdPositionSynonyms = w.definitions[2]
            ? w.definitions[2].synonyms.length
            : 0;
        const totalForthPositionSynonyms = w.definitions[3]
            ? w.definitions[3].synonyms.length
            : 0;
        const totalFifthPositionSynonyms = w.definitions[4]
            ? w.definitions[4].synonyms.length
            : 0;
        // Check if a second definition exists
        // let totalSecondPositionSynonyms;
        // if (w.definitions[1]) {
        //     const secondDefinition = w.definitions[1];
        //     const partOfSpeech = secondDefinition.part_of_speech;
        //     const totalSynonyms = secondDefinition.synonyms.length;
        //     totalSecondPositionSynonyms = totalSynonyms + " " + partOfSpeech;
        // } else {
        //     totalSecondPositionSynonyms = 0;
        // }

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

    const handleClickOpen = (row) => {
        setOpen(true);
        setRowData(row);
    };

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
                        <IconButton
                            size="small"
                            className="invisible group-hover:visible"
                        >
                            <ContentCopy fontSize="24px" />
                        </IconButton>
                    </div>
                </TableCell>
                {columns.slice(1).map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? "right" : "left"}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
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
