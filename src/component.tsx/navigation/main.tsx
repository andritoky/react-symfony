import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { verify } from 'crypto';
import { myHeaders } from '../../http/headers';

let Main = () => {
    let navigate = useNavigate()
    useEffect(() => {
        verifyToken()
    }, []);

    let verifyToken = async () => {
        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ token: Cookies.get('token') })
        }
        let reponse = await fetch(`http://localhost:8000/api/verify-token`, requestOption)
        let data = await reponse.json()
        console.log(data);

        data.token_verify === true ? navigate('/home') : navigate('/login')
    }

    return (<></>)
}

export default Main;
