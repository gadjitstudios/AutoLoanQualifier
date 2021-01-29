import React from 'react';
import AppInputOnlyForm from '../../components/InputOnlyForm';
import './index.scss';

const formInputs = [
    { id: "Username", label: "User Name", type: "email" },
    { id: "Password1", label: "Password", type: "password" },
    { id: "Password2", label: "Please Re-enter Password", type: "password" },
]

export default function AppNewAccount() {

    const handleFromSubmit = (e) => {
        alert('Yay');
    }
    return (
        <AppInputOnlyForm formInputs={formInputs} handleFromSubmit={handleFromSubmit} />
    )
}