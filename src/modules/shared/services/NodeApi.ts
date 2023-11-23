import axios from 'axios';

const SpringApi = axios.create({
    baseURL: 'http://localhost:3000',
}) ;

export default SpringApi;