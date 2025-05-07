// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

// export default API;
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default API;