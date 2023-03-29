import axios from 'axios';

const requestServer = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true
});

export default requestServer;