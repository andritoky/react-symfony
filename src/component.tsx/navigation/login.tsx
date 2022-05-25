import React from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';

interface DataResponse {
    status: number,
    authentification: boolean,
    message: string,
    class: string
}

function Login() {

    let navigate = useNavigate()
    let name = useRef<HTMLInputElement | null>(null),
        password = useRef<HTMLInputElement | null>(null)

    let [res, setResponse] = useState<DataResponse>()
    let [message, setMessage] = useState()


    useEffect(() => {
        isCookie()
    }, [])

    let isCookie = async function () {

    }

    let register = function () {

    }
    let login = async () => {
        let login_data = {
            name: name.current?.value,
            password: password.current?.value,
        }
        let myHeaders = new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json"
        });
        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(login_data)
        }
        let reponse = await fetch('http://localhost:8000/auth/login', requestOption)
        let reponse_status = await reponse.json()
        console.log(reponse_status);
        setResponse(reponse_status)
        setMessage(reponse_status.message)
        reponse_status.authentification === true ? navigate("/home") : console.log("auth:false");


    }

    async function requetLogin() {


    }

    return (
        <div className="block-login">
            <div className="box-login">
                <h3>Login </h3>
                <label >Name   </label>
                <input ref={name} type="text" placeholder=" name" className="form-control" />
                <label >Password  </label>
                <input ref={password} type="password" placeholder=" password" className="form-control" />

                <br />
                <div>
                    <button onClick={login} className="btn btn-primary" >Login</button>
                    <button onClick={register} className="btn btn-dark btn-register" >Register</button>
                </div>
                <br />
                {message ? <div className={res?.class}>{message}</div> : ""}

                <br />



            </div>
        </div>
    )

}

export default Login
