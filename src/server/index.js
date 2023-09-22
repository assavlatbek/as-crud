import axios from 'axios'

const request = axios.create({
    baseURL: 'https://64b3350238e74e386d55eed7.mockapi.io/v1/',
});

export default request