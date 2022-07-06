import React, { useEffect, useMemo, useRef, useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { log } from 'console';
import { myHeaders, requestOptionGet } from '../http/headers';

interface DataReponse {
    status?: number,
    id: number,
    class: string,
    detail: string,
    title: string
}
interface DataCategory {
    id: number,
    description: string,
    title: string
    articles: any
}


function AddArticle() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [myCategory, setMyCategory] = useState<DataCategory[]>()
    let [reponse, setReponse] = useState<DataReponse>()
    let [imageBase64, setImageBase64] = useState<any>()
    let [file, setFile] = useState<any>()
    let [extension, setExtension] = useState<any>()
    let dataCategory = useMemo(() => myCategory, [myCategory]);

    useEffect(() => {
        getCategory()
    }, []);

    let getCategory = async () => {
        let reponse = await fetch(`http://localhost:8000/api/category/get`, requestOptionGet)
        let rep = await reponse.json()
        setMyCategory(rep)

    }

    let title = useRef<HTMLInputElement | null>(null)
    let description = useRef<HTMLInputElement | null>(null)
    let image = useRef<HTMLInputElement | null>(null)
    let content = useRef<HTMLTextAreaElement | null>(null)
    let category = useRef<HTMLSelectElement | null>(null)

    let retourHome = () => {
        navigate("/article")
    }

    let onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList) return;
        const file = fileList[0]
        let extension = file.name.split('.').pop();
        console.log(extension);
        console.log(file);
        setExtension(extension)
        setFile(file)
        toBase64(file)

    }
    let toBase64 = (file: File) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = async () => {
            let res = await fileReader.result;
            setImageBase64(res)
            // console.log(res);
        };
    }

    let addNewArticle = async () => {

        let cate = dataCategory?.find((item: DataCategory) => item?.title == category?.current?.value)

        let data = {
            categoryId: cate?.id,
            title: title?.current?.value,
            description: description?.current?.value,
            content: content?.current?.value,
            imageBase64: imageBase64,
            file: file,
            extension: extension,
        }
        console.log("data :", data);

        let requestOption = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        }

        let reponse = await fetch(`http://localhost:8000/api/article/add`, requestOption)
        let rep = await reponse.json()
        setReponse(rep)
        console.log(rep);
    }


    return (
        <div className="App">
            <h3 className='new-entete'>Creer nouvelle article </h3><br />
            <form>
                <div className='mb-3'>
                    <label className="form-label">Chose Category</label>
                    <select
                        ref={category}
                        className="form-select"
                        aria-label="Default select example">
                        <option defaultValue={"default"} disabled>Exemple : Category 01</option>
                        {
                            dataCategory?.map((category: any, index: any) => {
                                return <option key={index}>{category?.title}</option>
                            })
                        }
                    </select>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Title</label>
                    <input type="text" ref={title} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">description</label>
                    <input type="text" ref={description} className="form-control" />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Image</label>
                    <input type="file" ref={image} onChange={onImageChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea ref={content} className="form-control" id="exampleFormControlTextarea1" ></textarea>
                </div>

            </form>
            <div>
                <button type="submit" className="btn btn-primary" onClick={addNewArticle}>Submit</button>
                <button type="submit" className="btn btn-dark float-right" onClick={retourHome} >Liste Article</button>
            </div>

            <div style={{ marginTop: "50px" }}>
                {reponse?.detail ? <div className='alert alert-danger'> {reponse?.detail}</div> : null}

                {reponse?.id ? <div className='alert alert-success'> Add succes </div> : null}
            </div>

        </div >
    )
}

export default AddArticle;
