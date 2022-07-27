import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = 'http://localhost:7000/api'  

const $api = axios.create({
   withCredentials: true, // чтобы к каждому полю автомат. были куки
   baseURL: API_URL
})

// interceprot - перехватчик

$api.interceptors.request.use(config => {
   if(!!config.headers){
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
   }
   

   return config
})

$api.interceptors.response.use(config => config, async (err)=> {
   const originalRequest = err.config;

   if(err.response.status === 401 && originalRequest && !originalRequest._isRetry){
      originalRequest._isRetry = true

      try {

         const response =  await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
         localStorage.setItem('token', response.data.accessToken)
   
         return $api.request(originalRequest)

      } catch (e) {
         console.log('Пользователь не авторизован')
      }
      throw err;
   }
})



export default $api