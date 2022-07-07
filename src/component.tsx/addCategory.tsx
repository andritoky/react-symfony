import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { myHeaders, requestOptionGet } from '../http/headers';
import { title } from 'process';

interface DataReponse {
    status?: number,
    id: number,
    class: string,
    detail: string,
    title: string
}

function AddCategory() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [reponse, setReponse] = useState<DataReponse>()

    let title = useRef<HTMLInputElement | null>(null)
    let description = useRef<HTMLInputElement | null>(null)

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

    let addNewCategory = async () => {

        let data = {
            title: title?.current?.value,
            description: description?.current?.value,
        }

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }
        console.log(data);
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/add`, requestOption)
        let rep = await reponse.json()
        setReponse(rep)
        console.log(rep);
    }
    return (
        <div className="App">
            <h3>New Category :</h3><br />
            <form>
                <div className='mb-3'>
                    <label className="form-label">Title</label>
                    <input type="text" ref={title} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Description</label>
                    <input type="number" ref={description} className="form-control" />
                </div>
            </form>
            <div>
                <button type="submit" className="btn btn-primary" onClick={addNewCategory}>Submit</button>
                <button type="submit" className="btn btn-dark float-right" onClick={retourHome} >Home</button>
            </div>

            <div style={{ marginTop: "50px" }}>
                {reponse?.detail ? <div className='alert alert-danger'> {reponse?.detail}</div> : null}

                {reponse?.id ? <div className='alert alert-success'> Add succes </div> : null}
            </div>

        </div >
    )
}

export default AddCategory;