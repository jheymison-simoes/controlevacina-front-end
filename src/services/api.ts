import axios from 'axios';

const api = axios.create({
    baseURL: 'https://controlevacinacao-back-end.herokuapp.com',
});

export default api;