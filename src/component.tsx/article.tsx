import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from './button';
import { useNavigate } from 'react-router-dom';
import { requestOptionGet } from '../http/headers';
import TimeAgo from 'timeago-react';

// import { config } from "dotenv"

interface DataArticle {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    category: string,
    comments: string,
    image: string,
    updateAt: string,
    content: string
}

function Article() {
    let [loading, setLoading] = useState<boolean>(true)
    let [mydata, setData] = useState<DataArticle[]>([])
    let data = useMemo(() => mydata, [mydata]);
    let fist = mydata[0];
    let navigate = useNavigate()
    let search = useRef<HTMLInputElement | null>(null)
    let [searchData, setSearchData] = useState<DataArticle[]>()


    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        let reponse = await fetch(`https://mon-test-symfo.herokuapp.com/api/article/get`, requestOptionGet)
        let data = await reponse.json()
        setLoading(false)
        setData(data)
        setSearchData(data)
        console.log(data);
    }

    let addArticle = async () => {
        navigate("/article/add")
    }

    let handleInChange = (event: any) => {

    }

    let searchdata = async () => {
        let searchQuery = search.current?.value;
        console.log("search :", searchQuery)
        var mysearch = "" + searchQuery?.toLowerCase() + "";
        var condition = new RegExp(mysearch);

        var tab: any = searchData;

        var result = tab.filter(function (el: any) {
            return condition.test(el.title.toLowerCase());// toLowerCase pour que search reconnai les Majuscule et Minuscule
        });

        setData(result)

        console.log("result", result);
    }

    return (
        <div className="tab-data">

            <div className='card-body'>
                <button className='btn btn-primary add-article' onClick={() => { addArticle() }}>Add Article</button>
                <h3 className='grand-titre'>Articles.</h3>
                <p>The first thing you need to do is decide on your blogging niche</p>
            </div>

            <div className='bl-liste'>
                <div className='box-liste'>
                    <div className='article-01'>
                        <img src="/images/life/image12.gif" />
                        <div className='content ct-art-1'>
                            <span>2022-07-07T09:10:22+00:00</span>
                            <p> Quel est le genre de l'article ?</p>
                            <button className="btn btn-outline-light btn-article-01">Detail</button>
                        </div>
                    </div>
                    <div className='bl-01-02'>
                        <div className='article-03'>
                            <img src="/images/life/image14.webp" />
                            <div className='ct-art-2'>
                                <span> 2022-01-09</span>
                                <p> Ressources naturelles à Madagascar</p>
                                <button className="btn btn-outline-light ">Detail</button>
                            </div>
                        </div>
                        <div className='article-02'>
                            <img src="/images/life/image6.png" />
                            <div className='ct-art-2'>
                                <span> 2022-01-09</span>
                                <p> Dubai Infos Pratiques</p>
                                <button className="btn btn-outline-light ">Detail</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='box-liste'>
                    <div className='search-item'>
                        <div className="input-group ">
                            <input ref={search} type="search" className="form-control rounded" placeholder=" Search By Title" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" className="btn btn-outline-primary" onClick={() => { searchdata() }} >search</button>
                            <button type="button" className="btn btn-dark" onClick={() => { addArticle() }}>add+</button>
                        </div>
                        <div>
                            <span className='nb-article'>{data?.length} Articles</span>
                        </div>

                    </div>

                    {
                        loading ?
                            <div className='loader'>
                                <img className='loader-img' src="/images/loading/loader2.gif" alt="" />
                                <p className='loader-text'>Chargement des donneés</p>
                            </div> : null
                    }


                    {
                        data?.map((article: DataArticle, index: number) => {
                            return (
                                <div className="liste-item " key={index}>
                                    <div>
                                        <img src={article.image} />
                                    </div>
                                    <div>
                                        <span className='item-date'>  <TimeAgo
                                            datetime={article?.createdAt}
                                            locale='fr'
                                        /></span>
                                        <h5 className="card-title ">
                                            <span className='item-title'>{article.title} </span>
                                        </h5>
                                        <p className="card-text">{article.description}</p>
                                        <a href={"/article/view/" + article.id} className="btn btn-dark">Detail</a>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default Article;
