import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/Authslice.js'
import authService from '../services/authService.js'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = async () => {

        try {

            await authService.logout()

            dispatch(logout())

        } catch (error) {

            console.log(error)

        }
    }

    return (
        <button
            className='inline-block px-6 py-2 duration-200 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-full click-btn'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn