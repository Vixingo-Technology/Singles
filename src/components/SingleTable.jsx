import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("extraordinary", 3, 508, 16.0, 49, 3.9),
];

function SingleTable() {
    const { data, loading } = useDemoData({
        dataSet: "Commodity",
        rowLength: 20,
        maxColumns: 20,
    });

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
        id: false,
        brokerId: false,
        status: false,
    });
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="single table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "600" }}>
                                Word
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                Word Rank
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                #Syn
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                #Meanings
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                # Syn 1st Mean
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                # Syn 2nd Mean
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                # Syn 3rd Mean
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                # Syn 4th Mean
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                # Syn Last Mean
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                Opened/ Modified
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600" }}>
                                Adjust Synonym(s)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">
                                    {row.protein}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    {...data}
                    loading={loading}
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)
                    }
                />
            </div>
        </>
    );
}

export default SingleTable;
