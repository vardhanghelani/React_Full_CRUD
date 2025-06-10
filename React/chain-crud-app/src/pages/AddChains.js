import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddChains() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/Chains`;

        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(() => {
                navigate('/Chains');
            });
    };

    return (
        <>
            <div className="form-group row">
                <label className="col-4 col-form-label">Enter ChainID</label>
                <div className="col-8">
                    <input
                        name="id"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-4 col-form-label">Enter ChainName</label>
                <div className="col-8">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-4 col-form-label">Enter ChainPrice</label>
                <div className="col-8">
                    <input
                        name="price"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-4 col-form-label">Enter ChainStock</label>
                <div className="col-8">
                    <input
                        name="stock"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-4 col-form-label">Enter ChainImage</label>
                <div className="col-8">
                    <input
                        name="image"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddChains;
