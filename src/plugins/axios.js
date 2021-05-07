import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://api-meme-zendvn-01.herokuapp.com/api/',
    headers: {
        'accept': 'application/json'
    }
});

export default axiosInstance;