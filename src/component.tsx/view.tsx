import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';

interface DataClient {
    id: number,
    name: string,
    age: number,
    adresse: string
}

function View() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [data, setData] = useState<DataClient>()
    useEffect(() => {
        getData();
    }, []);
    let getData = async () => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/view/` + id)
        let data = await reponse.json()
        console.log(data);
        setData(data)
    }
    let retourHome = () => {
        navigate('/home')
    }
    return (
        <div className="App">
            {/* <div className='name'>Delail </div> <br /> */}
            <div className='box-view'>
                <div className='profile'>
                    <img src="/images/profile.jpg" alt="" />
                </div>
                <div>
                    <div className='name'>{data?.name}</div> <br />
                    <div>Id : {data?.id}</div>
                    <div>Name : {data?.name}</div>
                    <div>Age : {data?.age}</div>
                    <div>Address : {data?.adresse}</div>
                </div>
            </div>
            <br />
            <button className='btn btn-primary' onClick={() => { retourHome() }}>Home</button>
        </div>
    )
}

export default View;
