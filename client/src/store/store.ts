import { IUser } from "../models/IUser";
import { makeAutoObservable } from 'mobx'
import AuthService from "../service/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store{
   user = {} as IUser;
   isAuth: boolean = false;
   isFetching: boolean = false
   constructor(){
      makeAutoObservable(this)
   }

   setAuth(isAuthStatus: boolean){
      this.isAuth = isAuthStatus
   }

   setUser(user: IUser){
      this.user = user
   }

   setFetching(statusFetching: boolean){
      this.isFetching = statusFetching
   }

   async login(email: string, password: string){
      this.setFetching(true)
      try {
         const response = await AuthService.login(email, password)
         console.log('response', response)

         localStorage.setItem('token', response.data.accessToken);

         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
      finally{
         this.setFetching(false)

      }
   }

   async registration(email: string, password: string){
      this.setFetching(true)

      try {
         const response = await AuthService.registration(email, password)
         console.log('response', response)
         localStorage.setItem('token', response.data.accessToken);

         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
      finally{
         this.setFetching(false)

      }
   }

   async logout(){
      try {
         await AuthService.logout()
         localStorage.removeItem('token');

         this.setAuth(false)
         this.setUser({} as IUser)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
   }

   
   async checkAuth(){
      this.setFetching(true)
      try {
        const response =  await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})

        localStorage.setItem('token', response.data.accessToken);

        this.setAuth(true)
        this.setUser(response.data.user)
      } catch (e: any) {
         console.log(e.response?.data?.message)
      }
         finally{
         this.setFetching(false)

      }
   }
}