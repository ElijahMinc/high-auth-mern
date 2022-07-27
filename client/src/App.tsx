import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import './App.css';
import { LoginForm } from './components/LoginForm';
import {observer} from 'mobx-react-lite'
import { IUser } from './models/IUser';
import UserService from './service/UserService';
function App() {
  const {store} = useContext(Context)
  const [users,setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')){

      store.checkAuth()
    }
  }, [])

 async function getUsers(){
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
        console.log(e)
    }
  }

  if(store.isFetching){
    return <h1>Loading...</h1>
  }

  if(!store.isAuth){
    return (
      <LoginForm/>
    )
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? "Авторизован" : "Не авторизован"}</h1>
      <h2>{store.user.isActivated ? "Аккаунт подтвержден по почте" : "Подтвердите свой акк по почте"}</h2>
      <button onClick={() => store.logout()}>Выйти</button>
      <button onClick={getUsers}>Получить список пользователей</button>
      {!!users.length && (
        <ul>
           {users.map(({id, email}) =>
           <li>{id} {email}</li>
           )}

        </ul>
      )}
    </div>
  );
}

export default observer(App);
