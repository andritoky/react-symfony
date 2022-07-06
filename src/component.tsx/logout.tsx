import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout() {

    let navigate = useNavigate()
    let logout = () => {
        Cookies.remove('token')
        window.location.href = "http://localhost:3000/login";
    }
    return (
        <>
            <button className='btn btn-dark' onClick={logout}>Log out</button>
        </>
    )
}

export default Logout;
