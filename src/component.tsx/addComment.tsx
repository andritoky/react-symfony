import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { myHeaders, requestOptionGet } from '../http/headers';

function AddComment({ ajoutCommentaire }: any) {
    // let [mydata, setData] = useState<DataArticle>()
    // let data = useMemo(() => mydata, [mydata]);
    let navigate = useNavigate()
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
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/comment/add/` + id, requestOption)
        let data = await reponse.json()
        console.log(data);
        // navigate("/article/view/" + id + "")
        // window.location.replace("http://localhost:3000/article/view/" + id);
        getDataArticle()
    }


    let getDataArticle = async () => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/monapi/articles/` + id, requestOptionGet)
        let data = await reponse.json()
        ajoutCommentaire(data)
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