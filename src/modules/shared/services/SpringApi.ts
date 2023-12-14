import axios from 'axios';

const SpringApi = axios.create({
    baseURL: 'http://172.20.222.48:80/api/core',
}) ;

export default SpringApi;