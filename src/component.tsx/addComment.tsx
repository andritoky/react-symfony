import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { myHeaders } from '../http/headers';

function AddComment() {
    // let [mydata, setData] = useState<DataArticle>()
    // let data = useMemo(() => mydata, [mydata]);
    // let navigate = useNavigate()
    let comment = useRef<HTMLTextAreaElement | null>(null)
    let { id } = useParams()

    useEffect(() => {
    }, []);


    let ajoutComment = async () => {
        console.log(id, comment.current?.value);

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ 'comment': comment.current?.value })
        }
        let reponse = await fetch(`http://localhost:8000/api/comment/add/` + id, requestOption)
        let data = await reponse.json()
        console.log(data);

    }

    return (
        <div className="tab-data">
            <div className="mb-3">
                <label className="form-label">Ajouter Commentaire</label>
                <textarea ref={comment} className="form-control" id="exampleFormControlTextarea1" ></textarea>
            </div>

            <button className='btn btn-dark' onClick={() => { ajoutComment() }}>Ajouter</button>

        </div >
    )
}

export default AddComment;