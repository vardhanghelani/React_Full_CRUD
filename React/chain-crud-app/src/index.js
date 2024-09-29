import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import AddChains from './pages/AddChains';  
import GetAllChains from './pages/GetAllChains';
import DetailChains from './pages/DetailChains';
import EditChains from './pages/EditChains';
import Sales from './pages/Sales';
import Stockedit from './pages/StockEdit';
import SalesData from './pages/SalesDatajs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="/Chains/add" element={<AddChains />}/>
        <Route path="/Chains" element={<GetAllChains />}/>
        <Route path="/Chain/:id" element={<DetailChains />}/>
        <Route path="/Chain/edit/:id" element={<EditChains/>}/>
        <Route path="/Sales" element={<Sales/>}/>
        <Route path="/stockedit/:id" element={<Stockedit/>}/>
        <Route path="/SalesData" element={<SalesData/>}/>

      </Route>
    </Routes>  
  </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
