import axios from 'axios';

const SpringApi = axios.create({
    baseURL: 'http://localhost:8080',
}) ;

export default SpringApi;