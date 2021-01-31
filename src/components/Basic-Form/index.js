import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const formReducer = (state, input) => {
    switch (input.action.toLowerCase()) {
        case 'upsert':
            const { id, value, type, validity } = input;
            return {
                ...state,
                [id]: { value: value, type: type, validity: validity }
            }
        case 'reset':
            let tempState = Object.assign({}, state)
            Object.keys(tempState).forEach(k => {
                tempState[k].value = '';
                tempState[k].validity = true;
            });
            return tempState;
    }

}

export default function AppBasicForm(props) {

    const [formState, dispatchFormState] = useReducer(formReducer,
        () => {
            let state = {};
            for (let input of props.formInputs) {
                state[input.id] = { value: '', type: input.type, validity: true }
            }
            return state;
        }
    );

    const handleInputChange = ({ target }) => dispatchFormState(
        {
         action: 'upsert', 
         id: target.id, 
         value: target.value, 
         validity: true, 
         type: target.dataset.type 
        }
    );

    const handleFromSubmit = (e) => {
        e.preventDefault();
        props.handleFormSubmit(formState, dispatchFormState);
    }

    const resetForm = (e) => {
        e.preventDefault();
        dispatchFormState({ action: 'reset' });
    }

    const getValue = (id) => formState && formState[id] && formState[id].validity ? formState[id].value : '';
    const getValidation = (id) => formState && formState[id] && !formState[id].validity ? formState[id].value : '';
    const setValidity = (id, inputRef) => {
        if (inputRef) {
            let validityMsg = formState && formState[id] && !formState[id].validity ? formState[id].value : '';
            inputRef.setCustomValidity(validityMsg);
        }
    };

    return (
        <form onSubmit={handleFromSubmit}>
            {props.formInputs && props.formInputs.map((input, index) => (
                <span className="formRow" key={`input-${index}-${input.type}`}>
                    <label htmlFor={input.id}>{input.label}</label>
                    <input
                        id={input.id}
                        data-type={input.type}
                        ref={inputRef => setValidity(input.id, inputRef)}
                        value={getValue(input.id)}
                        onChange={handleInputChange}
                    />
                    <label htmlFor={input.id} className='invalidMsg'>{getValidation(input.id)}</label>
                </span>
            ))}
            <div>
                <button className='formBtn' onClick={resetForm}>Clear</button>
                <button className='formBtn' type='submit'>Submit</button>
            </div>
        </form>
    )
}
AppBasicForm.prototype = {
    formInputs: PropTypes.array,
    handleFormSubmit: PropTypes.func  
}