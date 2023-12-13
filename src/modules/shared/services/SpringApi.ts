import axios from 'axios';

const SpringApi = axios.create({
    baseURL: 'http://172.20.222.48:8080',
}) ;

export default SpringApi;