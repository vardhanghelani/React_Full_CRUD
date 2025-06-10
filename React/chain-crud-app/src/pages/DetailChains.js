import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailChains() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Chains/${id}`;
    fetch(apiUrl, { method: "GET" })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [id]);

  const handleDelete = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Chains/${id}`;
    fetch(apiUrl, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        navigate("/Chains");
      });
  };

  return (
    <>
      <Link className="btn btn-info" to="/Chains">Back</Link>
      &nbsp;&nbsp;&nbsp;
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
      <h1>Name = {data.name}</h1>
      <h3>Price = {data.price}</h3>
      <h3>Stock = {data.stock}</h3>
      <img
        src={data.image}
        alt={data.name}
        style={{ maxWidth: "30%", height: "auto" }}
      />
    </>
  );
}

export default DetailChains;
