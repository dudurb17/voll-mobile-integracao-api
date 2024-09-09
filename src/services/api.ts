import axios from 'axios';

const api =axios.create({
  baseURL:process.env.METRO_URL
})
export default api