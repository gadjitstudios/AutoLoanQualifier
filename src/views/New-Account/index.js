import React from 'react';
import AppBasicForm from '../../components/Basic-Form';
import Data from './index.data';
import './index.scss';

const formInputs = [
    { id: "Username", label: "User Name", type: "email" },
    { id: "Password1", label: "Password", type: "password" },
    { id: "Password2", label: "Please Re-enter Password", type: "password" },
]

export default function AppNewAccount() {
    return (
        <>
            <h1>New Account</h1>
            <AppBasicForm formInputs={formInputs} handleFormSubmit={Data.handleFormSubmit} />
        </>
    )
}