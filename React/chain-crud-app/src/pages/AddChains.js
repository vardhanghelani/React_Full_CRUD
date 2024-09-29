import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddChains() {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    return (
        <>
            <div className="form-group row">
                <label htmlFor="text3" className="col-4 col-form-label">Enter ChainID</label>
                <div className="col-8">
                    <input
                        onChange={(e) => setData({ ...data, id: e.target.value })} // Changed to 'id'
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="text1" className="col-4 col-form-label">Enter ChainName</label>
                <div className="col-8">
                    <input
                        onChange={(e) => setData({ ...data, name: e.target.value })} // Changed to 'name'
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter ChainPrice</label>
                <div className="col-8">
                    <input
                        onChange={(e) => setData({ ...data, price: e.target.value })} // Changed to 'price'
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter ChainStock</label>
                <div className="col-8">
                    <input
                        onChange={(e) => setData({ ...data, stock: e.target.value })} // Changed to 'image'
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter ChainImage</label>
                <div className="col-8">
                    <input
                        onChange={(e) => setData({ ...data, iamge: e.target.value })} // Changed to 'image'
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button
                        onClick={() => {
                            const apiUrl = 'http://localhost:3000/Chains';
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
                        }}
                        className="btn btn-primary"
                    >
                        Add
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddChains;
