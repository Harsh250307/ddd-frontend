
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://didhar-singh-1.onrender.com', // Replace with your Render backend URL
});

export default instance;
