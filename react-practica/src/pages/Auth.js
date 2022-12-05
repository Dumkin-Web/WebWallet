import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import RegistrationCard from "../components/RegistrationCard";
import { AUTH_ROUTE} from "../utils/consts"

const Auth = observer(() =>{
    const location = useLocation();
    const isLogin = location.pathname === AUTH_ROUTE;
    return(
            isLogin ? <AuthCard /> : <RegistrationCard />
        )
})

export default Auth;