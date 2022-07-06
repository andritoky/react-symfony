import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { myHeaders, requestOptionGet } from '../http/headers';

interface DataReponse {
    status?: number,
    id: number,
    class: string,
    detail: string,
    title: string
}

function Add() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [reponse, setReponse] = useState<DataReponse>()

    let name = useRef<HTMLInputElement | null>(null)
    let age = useRef<HTMLInputElement | null>(null)
    let address = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        test()
    }, []);

    let test = async () => {
        let reponse = await fetch(`http://localhost:8000/teste2`, requestOptionGet)
        let rep = await reponse.json()
        console.log(rep);
    }

    let retourHome = () => {
        navigate("/home")
    }

    let addNewClient = async () => {
        let myage;
        let stringAge = age?.current?.value

        let parseAge = (): void => {
            let ageToString = String(stringAge)
            let ageToNumber = parseInt(ageToString)
            myage = ageToNumber
        }
        stringAge ? parseAge() : console.log("age attribute must be in string given.")

        let data = {
            name: name?.current?.value,
            adresse: address?.current?.value,
            age: myage,
        }

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }
        console.log(data);
        let reponse = await fetch(`http://localhost:8000/api/client/add`, requestOption)
        let rep = await reponse.json()
        setReponse(rep)
        console.log(rep);
    }
    return (
        <div className="App">
            <h3>New Client :</h3><br />
            <form>
                <div className='mb-3'>
                    <label className="form-label">Name</label>
                    <input type="text" ref={name} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Age</label>
                    <input type="number" ref={age} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Address</label>
                    <input type="text" ref={address} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" />
                </div>

            </form>
            <div>
                <button type="submit" className="btn btn-primary" onClick={addNewClient}>Submit</button>
                <button type="submit" className="btn btn-dark float-right" onClick={retourHome} >Home</button>
            </div>

            <div style={{ marginTop: "50px" }}>
                {reponse?.detail ? <div className='alert alert-danger'> {reponse?.detail}</div> : null}

                {reponse?.id ? <div className='alert alert-success'> Add succes </div> : null}
            </div>

        </div >
    )
}

export default Add;
