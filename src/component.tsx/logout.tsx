import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';

function Logout() {

    let navigate = useNavigate()
    let logout = () => {
        navigate("/login")
    }
    return (
        <>
            <button className='btn btn-dark' onClick={logout}>Log out</button>
        </>
    )
}

export default Logout;
