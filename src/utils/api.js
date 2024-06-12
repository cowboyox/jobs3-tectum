import axios from 'axios'
import { backend_url } from './variables'

const api = axios.create({
    baseURL: backend_url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjU0ZjBmMjU2ZmI2NDBiNWVlNjI1MCIsImlhdCI6MTcxNzkyMzc1NywiZXhwIjoxNzE4NTI4NTU3fQ.n7I0XJxv3gOXpuKqd4NWhSFQxCKtRcMgUlBzxuPUwIo'
    }
})

export default api