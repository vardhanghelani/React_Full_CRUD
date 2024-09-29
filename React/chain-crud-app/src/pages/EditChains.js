import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditChains() {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const apiUrl = "http://localhost:3000/Chains/" + id;
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => setData(res));
    }, [id]);

    return (
        <>
            <div className="form-group row">
                <label htmlFor="text3" className="col-4 col-form-label">Enter ChainID</label>
                <div className="col-8">
                    <input value={data.id || ""} onChange={(e) => {
                        setData({ ...data, id: e.target.value })
                    }} type="text" className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="text1" className="col-4 col-form-label">Enter ChainName</label>
                <div className="col-8">
                    <input value={data.name || ""} onChange={(e) => {
                        setData({ ...data, name: e.target.value })
                    }} type="text" className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="text3" className="col-4 col-form-label">Enter ChainPrice</label>
                <div className="col-8">
                    <input value={data.price || ""} onChange={(e) => {
                        setData({ ...data, price: e.target.value })
                    }} type="text" className="form-control" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter ChainStock</label>
                <div className="col-8">
                    <input value={data.stock || ""}
                        onChange={(e) => setData({ ...data, stock: e.target.value })} 
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter ChainImage</label>
                <div className="col-8">
                    <input value={data.image || ""} onChange={(e) => {
                        setData({ ...data, image: e.target.value })
                    }} type="text" className="form-control" />
                </div>
            </div>

            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button onClick={() => {
                        // Prepare the data to send to the server
                        const updatedData = {
                            id: Number(data.id),         // Ensure ID is a number
                            name: data.name,
                            price: Number(data.price),   // Ensure price is a number
                            stock: Number(data.stock),   // Ensure stock is a number
                            image: data.image,
                        };

                        const apiUrl = "http://localhost:3000/Chains/" + id;
                        fetch(apiUrl, {
                            method: "PATCH",  // Use PATCH method
                            body: JSON.stringify(updatedData),  // Send the updated data
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error("Network response was not ok");
                            }
                            return res.json();
                        })
                        .then(() => {
                            navigate("/Chains");  // Navigate back to the Chains list
                        })
                        .catch(error => {
                            console.error("There was a problem with the fetch operation:", error);
                        });
                    }} className="btn btn-primary">Edit</button>
                </div>
            </div>
        </>
    );
}

export default EditChains;
