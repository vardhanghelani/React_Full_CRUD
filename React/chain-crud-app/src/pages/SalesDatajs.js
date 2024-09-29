import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SalesData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = "http://localhost:3000/EditedStocks"; 
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((res) => setData(res))
            .catch((error) => {
                console.error("Fetch error:", error); // Log error details
                setError("Failed to fetch edited stocks data.");
            });
    }, []);

    const handleDelete = (id) => {
        const apiUrl = `http://localhost:3000/EditedStocks/${id}`;
        fetch(apiUrl, {
          method: "DELETE",
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Continue with the state update or refetch here
        })
        .catch((error) => {
          console.error("Delete error:", error); // Log delete error details
          setError("Failed to delete stock.");
        });
      };
      
      
    const formattedEditedStocks = data.map((stock) => {
        return (
            <tr key={stock.id}>
                <td style={{ padding: "5px" }}>{stock.id}</td>
                <td style={{ padding: "5px" }}>{stock.newStock}</td>
                <td>
                    <Link className="btn btn-warning" to={"/stockedit/" + stock.id}>Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(stock.id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Edited Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedEditedStocks.length > 0 ? formattedEditedStocks : (
                        <tr>
                            <td colSpan="4" className="text-center">No edited stocks found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default SalesData;
