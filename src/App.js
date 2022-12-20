import React from "react";
import Login from "./components/Login"
import Header from "./components/Header";
import Homescreen from "./components/Homescreen";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
//import {useState, useEffect } from "react";

//const CLIENT_ID = "eee6212ac836476a9ac3733fa623ecc4";
//const CLIENT_SECRET = "4ecd2073a4294284874860b2e29205da";

const code = new URLSearchParams(window.location.search).get('code');





function App() {
//is the user logged in state



  

  return (
    <div>
    

    {code ? <Homescreen code={code} /> : <Login />}
      
    </div>
  );
}

export default App;
