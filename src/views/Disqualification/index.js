import React from 'react';
import {useLocation} from "react-router-dom";
import './index.scss'

export default function AppDisqualification(){
    const location = useLocation();

    return(
        <>
            <h1>Disqualified Loan Application</h1>
            <div className="content">
                <p>Your application for an auto loan has been disqualified for the following reasons:</p>
                <p>{location.state.message}</p>
                <p>Please contact customer service at: 555-555-5555 ext. 5555</p>
            </div>
        </>
    )
}