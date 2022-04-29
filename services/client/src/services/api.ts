import axios from 'axios';

export const api = axios.create({
    baseURL: `/api/${process.env.CLIENT_API_VERSION}/`,
    headers: {
        Accept: 'application/json'
    }
})