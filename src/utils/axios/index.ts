import axios from 'axios'



const api = axios.create({
    baseURL: 'https://vadimovich-back.prolabagency.com/api/v1',
    headers: {
        "Content-Type": "application/json"
    }
})

export default api