import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-app-b2943-default-rtdb.firebaseio.com/"
})

export default instance;