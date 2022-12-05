import React, { useContext } from "react";
import {Navigate, Routes} from 'react-router-dom';
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() =>{
    const {user} = useContext(Context);
    return(<Routes>
        {user.isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component} exact/>
        )}
        {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component} exact/>
        )}
        <Route path="*"element={<Navigate to="/" replace />}/>
        
    </Routes>)
})

export default AppRouter;