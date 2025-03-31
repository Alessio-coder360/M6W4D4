import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v3/blog',

    headers: {'X-Custom-Header': 'foobar'}
})

export default axiosInstance;