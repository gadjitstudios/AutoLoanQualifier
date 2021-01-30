import React from 'react';
import AppInputOnlyForm from '../../components/InputOnlyForm';
import './index.scss';

const formInputs = [
    { id: "purchasePrice", label: "Purchase Price", type: "currency" },
    { id: "autoMake", label: "Auto Make", type: "text" },
    { id: "autoModel", label: "Auto Model", type: "text" },
    { id: "yearlyIncome", label: "Estimated Yearly Income", type: "currency" },
    { id: "creditScore", label: "Estimated Credit Score", type: "creditScore" },
]

export default function AppLanding() {

    const handleFromSubmit = (e) => {
        alert('Yay');
    }
    return (
        <>
        <h1>Auto Loan Details</h1>
        <AppInputOnlyForm formInputs={formInputs} handleFromSubmit={handleFromSubmit} />
        </>
    )
}