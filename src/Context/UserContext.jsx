import { createContext, useEffect, useState } from "react";

export let UserContext=createContext(0)


export function UserContextProvider(props){
   const[userLogin,setuserLogin]=useState(null)

   useEffect(()=>{
    if(localStorage.getItem('token')!==null){
        setuserLogin(localStorage.getItem('token'))
    }

   },[]);
    return<UserContext.Provider value={{userLogin,setuserLogin}}>
        {props.children}
    </UserContext.Provider>
}