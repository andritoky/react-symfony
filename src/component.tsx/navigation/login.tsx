import React from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie'
import { myHeaders } from '../../http/headers';

interface DataResponse {
    status: number,
    authentification: boolean,
    message: string,
    class: string,
    error: string
}

function Login() {

    let navigate = useNavigate()
    let email = useRef<HTMLInputElement | null>(null),
        password = useRef<HTMLInputElement | null>(null)

    let [res, setResponse] = useState<DataResponse>()
    let [message, setMessage] = useState()


    useEffect(() => {
        verifyToken()
        isCookie()
    }, [])

    let isCookie = async function () {

    }

    let register = function () {

    }

    let verifyToken = async () => {
        let myHeaders = new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        });
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

    let ifAuthTrue = (token: string) => {
        Cookies.set('token', token)
        navigate("/home")
    }
    let login = async () => {
        let login_data = {
            email: email.current?.value,
            password: password.current?.value,
        }

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(login_data)
        }
        let reponse = await fetch('http://localhost:8000/api/login', requestOption)
        let reponse_status = await reponse.json()
        console.log(reponse_status);
        // console.log("header :", reponse.headers);
        setResponse(reponse_status)
        setMessage(reponse_status.message)
        reponse_status.authentification === true ? ifAuthTrue(reponse_status.token) : console.log("auth:false");

    }

    async function requetLogin() {


    }

    return (
        <div className="block-login">
            <div className="box-login">
                <h3>Login </h3>
                <label >Email   </label>
                <input ref={email} type="text" placeholder=" email" className="form-control" />
                <label >Password  </label>
                <input ref={password} type="password" placeholder=" password" className="form-control" />

                <br />
                <div>
                    <button onClick={login} className="btn btn-primary" >Login</button>
                    <button onClick={register} className="btn btn-dark btn-register" >Register</button>
                </div>
                <br />
                {message ? <div className={res?.class}>{message}</div> : ""}
                {res?.error ? <div className="alert alert-danger">{res?.error}</div> : ""}

                <br />



            </div>
        </div>
    )

}

export default Login
