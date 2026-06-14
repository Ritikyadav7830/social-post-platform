import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import  Footer  from './Components/Footer/Footer'
import  Header  from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import { login, logout } from "./Store/authSlice";

function App() {
//   const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {

    const getCurrentUser = async () => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(
                 `${API_URL}/api/v1/users/current-user`,
                {
                    credentials: "include",
                }
            );

            console.log("APP MOUNT");
            const result = await response.json();

            if (result.success) {

                dispatch(
                    login(result.data)
                );

            } else {

                dispatch(logout());

            }

        } catch (error) {

            console.log(error);

            dispatch(logout());
        }
        // } finally {

        //     setLoading(false);

        // }
    };

    getCurrentUser();

}, [dispatch]);


// if (loading) {
//     return (
//         <div className="text-center py-8">
//             Loading...
//         </div>
//     );
// }
  
  return  (
    <div className='min-h-screen flex flex-col bg-slate-100'>
     
        <Header />
        <main className='flex-grow pt-8'>
        {/* TODO:  */}
         <Outlet />
        </main>
        <Footer />
    
    </div>
  )
}

export default App