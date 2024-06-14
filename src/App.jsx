import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import WordTabs from "./screens/WordTabs";
import { WordContext } from "./contexts/WordContext";

function App() {
    const [words, setWords] = useState([]);
    const [editSum, setEditSum] = useState();
    const [defOrder, setDefOrder] = useState([1, 2, 3, 4, 5]);

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
                }}
            >
                <WordTabs />
            </WordContext.Provider>
        </>
    );
}

export default App;
