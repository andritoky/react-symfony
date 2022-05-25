import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';

function Main() {
    let navigate = useNavigate()
    useEffect(() => {
        navigate('/login')
    }, []);

    return (<></>)
}

export default Main;
