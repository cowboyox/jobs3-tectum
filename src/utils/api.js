import axios from 'axios'
import { backend_url } from './variables'

const api = axios.create({
    baseURL: backend_url,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api