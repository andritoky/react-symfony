import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';

interface DataReponse {
    status: number,
    class: string,
    detail: string,
    title: string
}

function Update() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [detail, setDetail] = useState<any>()
    let [reponse, setReponse] = useState<any>()

    let name = useRef<HTMLInputElement | null>(null)
    let age = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/view/` + id)
        let data = await reponse.json()
        console.log(data);
        setDetail(data)
    }

    let updateClient = async (id: number) => {
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
            age: myage,
        }
        let myHeaders = new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Apikey": "rthtjtjdfhgfjhfctdfhtfjffjdjdjdjsj",
        })

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }
        console.log(data);
        console.log(typeof data.age);
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/update/` + id, requestOption)
        let rep = await reponse.json()
        setReponse(rep)
        console.log(rep);
    }

    let retourHome = () => {
        navigate("/home")
    }


    return (
        <div className="App">
            <h3>Update Data ID : {detail?.id}</h3><br />
            <form>
                <div className='mb-3'>
                    <label className="form-label">Name</label>
                    <input type="text" ref={name} className="form-control" defaultValue={detail?.name} />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Age</label>
                    <input type="number" ref={age} className="form-control" defaultValue={detail?.age} />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" />
                </div>

            </form>
            <div>
                <button type="submit" className="btn btn-primary" onClick={() => { updateClient(reponse?.id) }}>Submit</button>
                <button type="submit" className="btn btn-dark float-right" onClick={retourHome} >Home</button>
            </div>

            <div style={{ marginTop: "50px" }}>
                {reponse?.detail ? <div className='alert alert-danger'> {reponse?.detail}</div> : null}
                {reponse?.id ? <div className='alert alert-success'> Add succes </div> : null}
            </div>

        </div >
    )
}

export default Update;