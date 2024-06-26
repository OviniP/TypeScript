import axios from "axios";
import { DiaryEntry} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getdiaryEntries = async () => {
    const response = await axios
        .get<DiaryEntry[]>(baseUrl);
    return response.data;
}  

const createEntry = async (newEntry:unknown) => {
    const response = axios
        .post(baseUrl,newEntry)
        .then(response => response.data)
    return response;
}

export default {
    getdiaryEntries,
    createEntry
}