import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css'
import Button from './button';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import Cookies from 'js-cookie';

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
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/get`)
        let data = await reponse.json()
        setData(data)
        console.log("cookies :", Cookies.get());
    }

    let addClient = () => {
        navigate('/add')
    }
    let viewClient = (id: number) => {
        navigate('/view/' + id)
    }
    let updateClient = (id: number) => {
        navigate('/update/' + id)
    }

    let deleteClient = async (id: number) => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/delete/` + id)
        let data = await reponse.json()
        console.log(data);
    }

    let searchdata = async () => {
        console.log(search.current?.value);
        let datasearch = search.current?.value
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/client/search/` + datasearch)
        let datajson = await reponse.json()
        setData(datajson)
    }

    let voirArticle = () => {
        navigate('/article')
    }
    return (
        <div className="tab-data">

            <div className='box-search-log-out'>
                <div className='search'>
                    <div className="input-group ">
                        <input ref={search} type="search" className="form-control rounded" placeholder=" Search Name" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => { searchdata() }}>search</button>
                        <button type="button" className="btn btn-dark" onClick={() => { addClient() }}>add+</button>
                        <button type="button" className="btn btn-primary" onClick={() => { voirArticle() }}>Article</button>
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
                                    <td className='action'>
                                        <button className='btn btn-dark' onClick={() => { viewClient(liste.id) }}>View</button>
                                        <button className='btn btn-primary' onClick={() => { updateClient(liste.id) }}><FaPen /></button>
                                        <button className='btn btn-danger' onClick={() => { deleteClient(liste.id) }}><FaTrashAlt /></button>
                                    </td>
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
