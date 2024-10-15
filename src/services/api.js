import axios from 'axios';

// Base URL: https://api.themoviedb.org/3/
// URL da api: movie/now_playing?api_key=21b710399fa79065898a61aec02a3839&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;