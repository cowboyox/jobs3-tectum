import axios from 'axios'
import { backend_url } from './variables'

const api = axios.create({
    baseURL: backend_url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmJhZTU0ZmQ5ODcyNjQyMmFhNjc2MiIsImlhdCI6MTcxODM2Nzc0NiwiZXhwIjoxNzE4OTcyNTQ2fQ.WTB55A8HTF7VtuasiFlc3Un22K7l9xvHgahvB-1Y5So'
    }
})

export default api