import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchWords,
    addWord,
    updateWord,
    deleteWord,
} from "../store/wordsSlice";

const WordManager = () => {
    const [newWord, setNewWord] = useState("");
    const [updateId, setUpdateId] = useState(null);
    const [updatedWord, setUpdatedWord] = useState("");
    const words = useSelector((state) => state.words.wordsList);
    const status = useSelector((state) => state.words.status);
    const error = useSelector((state) => state.words.error);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(words);
        if (status === "idle") {
            dispatch(fetchWords());
        }
    }, [status, dispatch]);

    const handleAddWord = () => {
        const id = new Date().toISOString();
        dispatch(addWord({ id, text: newWord }));
        setNewWord("");
    };

    const handleUpdateWord = (id, word) => {
        setUpdateId(id);
        setUpdatedWord(word);
    };

    const handleSaveUpdatedWord = () => {
        dispatch(
            updateWord({
                id: updateId,
                newWord: { id: updateId, text: updatedWord },
            })
        );
        setUpdateId(null);
        setUpdatedWord("");
    };

    const handleDeleteWord = (id) => {
        dispatch(deleteWord(id));
    };

    return (
        <div>
            <h1>Word Manager</h1>
            <div>
                <input
                    type="text"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Add a new word"
                />
                <button onClick={handleAddWord}>Add Word</button>
            </div>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            <ul>
                {/* {words.map((word) => (
                    <li key={word.id}>
                        {updateId === word.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedWord}
                                    onChange={(e) =>
                                        setUpdatedWord(e.target.value)
                                    }
                                />
                                <button onClick={handleSaveUpdatedWord}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                {word.text}
                                <button
                                    onClick={() =>
                                        handleUpdateWord(word.id, word.text)
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteWord(word.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))} */}
            </ul>
        </div>
    );
};

export default WordManager;
