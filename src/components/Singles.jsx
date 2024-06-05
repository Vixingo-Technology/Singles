import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Search } from "@mui/icons-material";
import ToggleButton from "./buttons/ToggleButton";
import SingleTable from "./SingleTable";
import DataTable from "./DataTable";
import VirtualTable from "./VirtualTable";
import EditBox from "./EditBox";
import axios from "axios";
import { WordContext } from "../contexts/WordContext";
function Singles() {
    // api calling
    const total_results = 50;
    const [start_word, setStart_word] = React.useState("A");
    const api = "https://api-zcg7jiz4mq-uc.a.run.app/words";
    // const [words, setWords] = React.useState([]);
    const { words, setWords } = useContext(WordContext);

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

    // search
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(words);
    const [type, setType] = useState([]);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        let searchedData = words?.filter((e) => {
            const lowerCaseTitle = e.name?.toLowerCase();
            if (lowerCaseTitle.includes(searchTerm?.toLowerCase())) {
                return true;
            }
            return false;
        });

        setSearchResults(searchedData);
    }, [searchTerm, words]);

    //multi filter
    const [filters, setFilters] = useState([
        "noun",
        "adverb",
        "verb",
        "adjective",
        "other",
    ]);
    useEffect(() => {
        let filteredData = words?.filter((e) => {
            if (type.length === 0) {
                return true;
            }
            if (type.includes(e.type)) {
                return true;
            }
            return false;
        });
        setSearchResults(filteredData);
    }, [type, words]);

    return (
        <>
            <Box sx={{ maxWidth: "1100px", margin: "30px auto" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            All Words
                        </Typography>
                        <Typography variant="subtitle2">
                            Displaying <b style={{ color: "#000" }}> 12,039</b>{" "}
                            matches
                        </Typography>
                    </Box>
                    <Box>
                        {" "}
                        <Box
                            sx={{
                                maxHeight: "38px",
                                maxWidth: "400px",
                                mb: 1,
                            }}
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Search for a word"
                                size="small"
                                fullWidth
                                sx={{
                                    backgroundColor: "#F0F3F6",
                                    borderRadius: "8px",
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: "#000" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e)}
                            />
                        </Box>{" "}
                        <Box sx={{ display: "flex", gap: "12px" }}>
                            <ToggleButton setType={setType} type={type}>
                                Nouns
                            </ToggleButton>
                            <ToggleButton>Verb</ToggleButton>
                            <ToggleButton>Adj</ToggleButton>
                            <ToggleButton>Adv</ToggleButton>
                            <ToggleButton>other</ToggleButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: "1300px", margin: "0 auto" }}>
                {/* <SingleTable /> */}
                {/* <DataTable /> */}
                <VirtualTable words={searchResults} />
            </Box>
        </>
    );
}

export default Singles;
