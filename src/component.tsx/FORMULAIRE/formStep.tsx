import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css'


function FormStep() {

    return (
        <div className="">
            <div className='alert alert-primary'> FormStep</div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" />
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Recipient's username" />
                <span className="input-group-text" id="basic-addon2">@example.com</span>
            </div>


            <label className="form-label">Your vanity URL</label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                <span className="input-group-text">.00</span>
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
                <span className="input-group-text">@</span>
                <input type="text" className="form-control" placeholder="Server" aria-label="Server" />
            </div>

            <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label">
                    Default checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                <label className="form-check-label" >
                    Checked checkbox
                </label>
            </div>

            <button type="button" className="btn btn-primary">Primary</button>
        </div>
    )
}

export default FormStep;
