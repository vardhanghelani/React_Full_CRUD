import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetAllChains() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/Chains/`;
        ;
        
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading Chains...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <>
            <Link to="/Chains/add" className="btn btn-primary">Add Chain</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>View</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((chain) => (
                        <tr key={chain.id}>
                            <td style={{ padding: "5px" }}>{chain.id}</td>
                            <td style={{ padding: "5px" }}>{chain.name}</td>
                            <td>
                                <Link className="btn btn-info" to={`/Chain/${chain.id}`}>Read More</Link>
                            </td>
                            <td>
                                <Link className="btn btn-warning" to={`/Chain/edit/${chain.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default GetAllChains;