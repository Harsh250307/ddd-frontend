
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://your-render-backend-url.com', // Replace with your Render backend URL
});

export default instance;
