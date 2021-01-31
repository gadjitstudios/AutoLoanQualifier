import React from 'react';
import {useLocation} from "react-router-dom";

export default function AppError(){
    const location = useLocation();
    return(
        <>
            <p>{location.state.errorMsg}</p>
        </>
    )
}