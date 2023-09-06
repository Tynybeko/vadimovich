import axios from 'axios'
import 'dotenv'


const api = axios.create({
    baseURL: process.env.API,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api