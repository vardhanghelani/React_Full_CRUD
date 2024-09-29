import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sales() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <div className="row">
                <div className="col-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter stock ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            if (searchTerm) {
                                navigate(`/stockedit/${searchTerm}`); // Navigate to StockEdit with the entered stock ID
                            }
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sales;
