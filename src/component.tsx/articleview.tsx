import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css'
import Button from './button';
import { useNavigate, useParams } from 'react-router-dom';
import AddComment from './addComment';
import { requestOptionGet } from '../http/headers';

interface Category {
    id: number,
    title: string,
    description: string,
    articles: string
}

interface Comments {
    id: number,
    author: string,
    content: string,
    createdAt: string,
    article: string
}

interface DataArticle {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    category: Category,
    comments: Comments[],
    image: string,
    updateAt: string,
    content: string
}

function ArticleView() {
    let [loading, setLoading] = useState<boolean>(true)
    let [mydata, setData] = useState<DataArticle>()
    let data = useMemo(() => mydata, [mydata]);
    let navigate = useNavigate()
    let { id } = useParams()

    let ajoutCommentaire = (data: DataArticle) => {
        setData(data)
    }

    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/monapi/articles/` + id, requestOptionGet)
        let data = await reponse.json()
        setLoading(false)
        setData(data)
        console.log(data);

    }

    let listeArticle = async () => {
        navigate("/")
    }

    let supArticle = async (id: any) => {
        console.log(id);
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/article/delete/` + id, requestOptionGet)
        let data = await reponse.json()
        console.log(data);
        navigate("/article")
    }


    return (
        <div className="tab-data">

            {
                loading ?
                    <div className='loader-view'>
                        <img className='loader-img' src="/images/loading/loader2.gif" alt="" />
                        <p className='loader-text-view'>Chargement des donneés</p>
                    </div> : null
            }

            <div className='view-article'>
                <button className='btn btn-dark retour-article' onClick={() => { listeArticle() }}>Retour Liste Article</button>
                <button className='btn btn-danger retour-article ' onClick={() => { supArticle(data?.id) }}>Supprimer cette article</button>

                <h4 > {data?.category.title}- ID : {data?.id}</h4>
                <p className="card-text">Date de creation : {data?.createdAt}</p>

            </div>

            <div className='article-dashbord'>

                <div className='dashbord-profile'>
                    <h5 className="view-title">{data?.title} </h5>
                    <p className="card-text"> {data?.description}</p>
                    <div className='article-image'>
                        <img src={"https://mon-test-symfo.herokuapp.com/uploads/images/" + data?.image} alt="" />
                        <img src={"/images/loading/loading2.gif"} alt="" />
                    </div>
                    <br />
                    <div>
                        <p>{data?.content}</p>
                    </div>

                    <br />
                </div>

                <div className='dashbord-comment'>

                    <AddComment ajoutCommentaire={ajoutCommentaire} />

                    <p className='entete-comment'>{data?.comments.length} Commentaires</p>

                    {
                        data?.comments.sort((a: any, b: any) => b.id - a.id).map((comment: Comments, index: number) => {
                            return (
                                <div className="item-comment" key={index}>
                                    <strong>{comment.author}</strong>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default ArticleView;