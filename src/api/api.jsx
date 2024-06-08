import axios from "axios";

const BASE_URL = "https://api-zcg7jiz4mq-uc.a.run.app";

export const getWords = async (offset = "", limit = 50) => {
    const response = await axios.get(`${BASE_URL}/words`, {
        params: { offset, limit },
    });
    return response.data;
};

export const getWord = async (word, combine = false) => {
    const response = await axios.get(`${BASE_URL}/words/${word}`, {
        params: { combine },
    });
    return response.data;
};

export const createDefinition = async (word, definition) => {
    const response = await axios.post(
        `${BASE_URL}/words/${word}/definitions`,
        definition
    );
    return response.data;
};

export const updateDefinition = async (definitionId, updates) => {
    const response = await axios.put(
        `${BASE_URL}/definitions/${definitionId}`,
        updates
    );
    return response.data;
};

export const deleteDefinition = async (definitionId) => {
    await axios.delete(`${BASE_URL}/definitions/${definitionId}`);
};
