import axios from 'axios';

const SpringApi = axios.create({
    baseURL: 'http://172.20.222.48:3000',
}) ;

export default SpringApi;