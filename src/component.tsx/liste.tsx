import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from './button';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';

interface DataClient {
    id: number,
    name: string,
    age: number
}

function Liste() {
    let [mydata, setData] = useState<DataClient[]>()
    let data = useMemo(() => mydata, [mydata]);
    let navigate = useNavigate()
    let search = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        let reponse = await fetch(`http://localhost:8000/client/get`)
        let data = await reponse.json()
        setData(data)
    }

    let viewClient = (id: number) => {
        navigate('/view/' + id)
    }

    let searchdata = async () => {
        console.log(search.current?.value);
        let datasearch = search.current?.value
        let reponse = await fetch(`http://localhost:8000/client/search/` + datasearch)
        let datajson = await reponse.json()
        setData(datajson)
    }
    return (
        <div className="tab-data">

            <div className='box-search-log-out'>
                <div className='search'>
                    <div className="input-group ">
                        <input ref={search} type="search" className="form-control rounded" placeholder=" Search Name" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => { searchdata() }}>search</button>
                    </div>
                </div>

                <div className='log-out'>
                    <Logout />
                </div>
            </div>


            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col" className='action'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data?.map((liste: DataClient, index: number) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{liste.id}</th>
                                    <td>{liste.name}</td>
                                    <td>{liste.age}</td>
                                    <td className='action'><button className='btn btn-primary' onClick={() => { viewClient(liste.id) }}>View</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <div className='alert alert-dark'>{data?.length} resultats</div>
        </div>
    )
}

export default Liste;
