import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
    Adjust,
    Checklist,
    ContentCopy,
    OpenInNew,
    Visibility,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

export default function DataTable() {
    const total_results = 100;
    const start_word = "bar";
    const api = "https://api-zcg7jiz4mq-uc.a.run.app/words";

    const handleEdit = (row) => {
        // Open a modal or dialog to edit the word
        // You can use the row data to pre-populate the form fields
        console.log("Editing word:", row.word);
    };

    const [mod, setMod] = React.useState("opened");
    const [adjust, setAdjust] = React.useState(true);
    const [words, setWords] = React.useState([]);
    const getwords = () => {
        const queryParam = "?offset=" + start_word + "&limit=" + total_results;
        const finalURL = api + queryParam;

        axios
            .get(finalURL)
            .then((res) => {
                const apiRes = res?.data;
                console.log("api response", apiRes);
                setWords(apiRes);
            })
            .catch((err) => {
                console.log("error while loading words", err);
            });
    };

    React.useEffect(() => {
        getwords();
    });

    const columns = [
        {
            field: "word",
            headerName: "Word",
            width: 190,

            renderCell: (params) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <IconButton size="small">
                        <OpenInNew color="primary" fontSize="24px" />
                    </IconButton>

                    <div style={{ flex: 1 }}>{params.value}</div>
                    <IconButton size="small">
                        <ContentCopy fontSize="24px" />
                    </IconButton>
                </div>
            ),
        },

        {
            field: "wordRank",
            headerName: "Word Rank",
            width: 130,
        },
        {
            field: "synonyms",
            headerName: "# Syn",
            width: 70,
            description: "# total synonyms",
        },
        {
            field: "meanings",
            headerName: "# Meanings",
            width: 100,
            description: "# total meanings",
        },
        {
            field: "Syn1",
            headerName: "# 1st mean",
            width: 100,
            description:
                "# of synonyms in the 1st position meaning group (w POS)",
        },
        {
            field: "Syn2",
            headerName: "# 2nd mean",
            width: 100,
            description:
                "# of synonyms in the 2nd position meaning group (w POS)",
        },
        {
            field: "Syn3",
            headerName: "# 3rd mean",
            width: 100,
            description:
                "# of synonyms in the 3rd position meaning group (w POS)",
        },
        {
            field: "Syn4",
            headerName: "# 4th mean",
            width: 100,
            description:
                "# of synonyms in the 4th position meaning group (w POS)",
        },
        {
            field: "Syn5",
            headerName: "# Last mean",
            width: 100,
            description:
                "# of synonyms in the FINAL position meaning group (w POS)",
            renderCell: (params) => {
                <p>{params} Noun</p>;
            },
        },

        {
            field: "Mod",
            headerName: "Modified Status",
            width: 140,
            description: "Modified status",
            renderCell: (params) => (
                <>
                    {mod === "opened" ? (
                        <Visibility color="warning" />
                    ) : mod === "modified" ? (
                        <Checklist color="primary" />
                    ) : (
                        ""
                    )}
                </>
            ),
        },
        {
            field: "adjust",
            headerName: "Adjust Synonym(s)",
            width: 140,
            description: "Adjust Synonym(s)",
            renderCell: (params) =>
                adjust ? <Adjust style={{ color: "#B3261E" }} /> : "",
        },

        // { field: "id", headerName: "ID", width: 70 },
        // { field: "firstName", headerName: "First name", width: 130 },
        // { field: "lastName", headerName: "Last name", width: 130 },
        // {
        //     field: "age",
        //     headerName: "Age",
        //     type: "number",
        //     width: 90,
        // },
        // {
        //     field: "fullName",
        //     headerName: "Full name",
        //     description: "This column has a value getter and is not sortable.",
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (value, row) =>
        //         `${row.firstName || ""} ${row.lastName || ""}`,
        // },
    ];

    const rows = [
        {
            id: 1,
            word: "extraordinary",
            wordRank: "3,508",
            synonyms: 190,
            meanings: 13,
            Syn1: 20,
            Syn2: 15,
            Syn3: 10,
            Syn4: 10,
            Syn5: 15,
        },

        // { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        // { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        // { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        // { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        // { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        // { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        // { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        // { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        // { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ];

    return (
        <div style={{ height: 500, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooterPagination={true}
                disableRowSelectionOnClick={true}
                // getRowClassName={(params) =>
                //     params.id === hoveredRow ? "hovered-row" : ""
                // }
                initialState={
                    {
                        // pagination: {
                        //     paginationModel: { page: 0, pageSize: 5 },
                        // },
                    }
                }
                // pageSizeOptions={[5, 10]}
                // checkboxSelection
            />
        </div>
    );
}
