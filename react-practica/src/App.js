import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import Topbar from "./components/Topbar";

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] =useState(true);

  useEffect(()=>{
   if(localStorage.getItem('phone') != null){
     user.setIsAuth(true);
   }
   setLoading(false);
  }, [])

  if (loading){
    return <Spinner animation="grow"/>
  }

  return (
    <BrowserRouter>
      <Topbar />
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
})

export default App;
