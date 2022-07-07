import React, { useEffect, useMemo, useRef, useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate, useParams } from 'react-router-dom';
import { log } from 'console';
import { myHeaders, requestOptionGet } from '../http/headers';
import { validate } from '../Service/validation';

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
    let [infoJuste, setInfoJuste] = useState(false)


    //Valiidation

    const initialValues = {
        category: "",
        title: "",
        image: "",
        description: "",
        content: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<any>({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        getCategory()
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    let handleSubmitForm = (e: any) => {
        e.preventDefault();
        let errors = validate(formValues)
        let erroLength = Object.keys(errors).length

        setFormErrors(errors);
        setIsSubmit(true);

        erroLength === 0 ? addNewArticle() : console.log("Not Send !")
    }

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
        rep.id ? navigate("/") : console.log(rep);

    }

    let infoJusteChange = () => {
        setInfoJuste(!infoJuste)
    }




    return (
        <div className="App">
            <h3 className='new-entete'>Creer nouvelle article </h3><br />
            <form onSubmit={handleSubmitForm}>
                <div className='mb-3'>
                    <label className="form-label">Chose Category</label>
                    <select
                        ref={category}
                        className="form-select"
                        aria-label="Default select example"
                    >
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
                    <input type="text" name="title" ref={title} value={formValues.title} onChange={handleChange} className="form-control" />
                    <p className='error'>{formErrors.title}</p>
                </div>
                <div className='mb-3'>
                    <label className="form-label">description</label>
                    <input type="text" ref={description} name="description" value={formValues.description} onChange={handleChange} className="form-control" />
                    <p className='error'>{formErrors.description}</p>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Image</label>
                    <input type="file" ref={image} onChange={onImageChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea ref={content} name="content" value={formValues.content} onChange={handleChange} className="form-control"  ></textarea>
                    <p className='error'>{formErrors.content}</p>
                </div>

                <div className="form-check">
                    <input onChange={infoJusteChange} checked={infoJuste === true} className="form-check-input" type="checkbox" />
                    <label className="form-check-label" >
                        J’accepte que les informations saisies soient exploitées dans le cadre d’une relation commerciale.
                    </label>
                </div>
                <br />
                <div>
                    <button type="submit" disabled={infoJuste === false} className="btn btn-primary" >Creer article</button>
                    <button className="btn btn-dark float-right" onClick={retourHome} >Retour Liste Article</button>
                </div>

            </form>



            <div style={{ marginTop: "50px" }}>
                {reponse?.detail ? <div className='alert alert-danger'> {reponse?.detail}</div> : null}

                {reponse?.id ? <div className='alert alert-success'> Add succes </div> : null}
            </div>

        </div >
    )
}

export default AddArticle;
