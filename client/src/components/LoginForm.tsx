import React, { useContext, useState } from 'react'
import { Context } from '..'
import {observer} from 'mobx-react-lite'



export const LoginForm: React.FC = observer(() => {
   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')
   const {store} = useContext(Context)


   return (
      <div>
         <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> 
         <input type='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" /> 
         <button onClick={() => store.login(email,pass )}>Логин</button>
         <button onClick={() => store.registration(email,pass )}>Регистрация</button>

      </div>
      )
})