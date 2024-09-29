import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailChains(){
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiUrl = "http://localhost:3000/Chains/"+id;
        fetch(apiUrl, {method:"GET"})
        .then(res=>res.json())
        .then(res=>setData(res));
    },[]);



    return(<>
        <Link className="btn btn-info" to="/Chains">Back</Link>
        &nbsp;&nbsp;&nbsp;
        <button onClick={()=>{
            const apiUrl = "http://localhost:3000/Chains/"+id;
            fetch(apiUrl,{method:"DELETE"})
            .then(res=>res.json())
            .then(res=>{
                navigate("/Chains");
            });

            

        }} className="btn btn-danger">Delete</button>
        <h1>Name = {data.name}</h1>
        <h3>Price = {data.price}</h3>
        <h3>Stock = {data.stock}</h3>
        <img src={data.image} style={{ maxWidth: "30%", height: "auto" }}/>
    </>);
}

export default DetailChains;