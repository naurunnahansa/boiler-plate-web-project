import { Outlet, Navigate } from "react-router-dom"
import React, {useContext} from 'react'

function PrivateRoutes(){

    let auth = {'token':false}

    return(
        auth.token ? <Outlet/> :<Navigate to="/moderator/login"/>
    )
}

export default PrivateRoutes