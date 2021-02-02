import React from 'react';
import AppBasicForm from '../../components/Basic-Form';
import Data from './index.data';
import './index.scss';

const formInputs = [
    { id: "purchasePrice", label: "Purchase Price", type: "currency" },
    { id: "autoMake", label: "Auto Make", type: "text" },
    { id: "autoModel", label: "Auto Model", type: "text" },
    { id: "yearlyIncome", label: "Estimated Yearly Income", type: "currency" },
    { id: "creditScore", label: "Estimated Credit Score", type: "creditScore" },
]

export default function AppHome() {
    return (
        <>
            <h1>Auto Loan Details</h1>
            <AppBasicForm formInputs={formInputs} handleFormSubmit={Data.handleFormSubmit} />
            <div id="marketingCopy">
                <h3>Marketing Copy:</h3>
                <p>Lorum Ipsem</p>
            </div>
        </>
    )
}