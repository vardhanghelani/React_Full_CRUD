import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StockEdit() {
    const [data, setData] = useState({ stock: 0 });
    const [newStock, setNewStock] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const apiUrl = "http://localhost:3000/Chains/" + id;
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => setData(res));
    }, [id]);

    const handleSubmit = () => {
        const updatedStock = data.stock - newStock;
    
        const updatedData = { ...data, stock: updatedStock };
    
        // Update the chain stock
        const apiUrl = "http://localhost:3000/Chains/" + id;
        fetch(apiUrl, {
            method: "PATCH",
            body: JSON.stringify(updatedData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            // Save the edited stock
            const editedStockData = {
                id: data.id, // This should match the id of the stock you are editing
                newStock: newStock // The amount subtracted
            };
            return fetch("http://localhost:3000/EditedStocks", {
                method: "POST",
                body: JSON.stringify(editedStockData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        })
        .then(() => {
            navigate("/chains");
        })
        .catch((error) => {
            console.error("Error updating stock:", error);
        });
    };
    

    return (
        <>
            <div className="form-group row">
                <label htmlFor="text" className="col-4 col-form-label">Enter Stock to Subtract</label>
                <div className="col-8">
                    <input
                        value={newStock}
                        onChange={(e) => setNewStock(Number(e.target.value))}
                        type="number"
                        className="form-control"
                        placeholder="Enter stock amount to subtract"
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button onClick={handleSubmit} className="btn btn-primary">Send</button>
                </div>
            </div>
        </>
    );
}

export default StockEdit;
