import axios from 'axios'
import 'dotenv'

const API_KEY = process.env.API
const API = "http://vadimovich-back.prolabagency.com/api/v1"

export const ITEM_API = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json"
    }
})
