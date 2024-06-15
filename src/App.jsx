import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import WordTabs from "./screens/WordTabs";
import { WordContext } from "./contexts/WordContext";

function App() {
    const [words, setWords] = useState([]);
    const [editSum, setEditSum] = useState();
    const [defOrder, setDefOrder] = useState([1, 2, 3, 4]);
    const [removed, setRemoved] = useState([]);
    const [changes, setChanges] = useState({
        added: [],
        deleted: [],
        updated: [],
        group: [],
    });
    return (
        <>
            <WordContext.Provider
                value={{
                    words,
                    setWords,
                    defOrder,
                    setDefOrder,
                    editSum,
                    setEditSum,
                    removed,
                    setRemoved,
                    changes,
                    setChanges,
                }}
            >
                <WordTabs />
            </WordContext.Provider>
        </>
    );
}

export default App;
