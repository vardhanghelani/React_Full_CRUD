import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetAllChains() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = "http://localhost:3000/Chains";
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    const formattedChains = data.map((chain) => {
        return (
            <tr key={chain.id}>
                <td style={{ padding: "5px" }}>{chain.id}</td> {/* Inline style to reduce padding */}
                <td style={{ padding: "5px" }}>{chain.name}</td> {/* Inline style to reduce padding */}
                <td>
                    <Link className="btn btn-info" to={"/Chain/" + chain.id}>Read More</Link>
                </td>
                <td>
                    <Link className="btn btn-warning" to={"/Chain/edit/" + chain.id}>Edit</Link>
                </td>
            </tr>
        );
    });

    return (
        <>
            <Link to="/Chains/add" className="btn btn-primary">Add Chains</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedChains}
                </tbody>
            </table>
        </>
    );
}

export default GetAllChains;
