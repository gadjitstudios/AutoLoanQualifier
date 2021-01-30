import React, { useReducer, useRef } from 'react';
import CheckInputValidity from '../../services/inputValidation';
import './index.scss';

const formReducer = (state, input) =>{
    if(input.target){
        input.target.setCustomValidity(input.validity? '': input.value);
    }
    return{
        ...state,
        [input.id]: {value: input.value, validity: input.validity}
    }
}


export default function AppInputOnlyForm(props) {
    const formRef = useRef();
    const [formData, setFormData] = useReducer(formReducer, {});
    const handleInputChange = ({target}) => setFormData({id: target.id, value: target.value, validity:true, target: target});
    const handleInputBlur = ({target}) => validateInput(target);

    const handleFromSubmit = (e) => {
        e.preventDefault();
        let isFormValid = true;
        const inputs = formRef.current.getElementsByTagName('INPUT');
        for(const target of inputs){
            isFormValid = validateInput(target)? isFormValid : false;
        }
        if(inputs.Password1 && inputs.Password2){
            if(inputs.Password1.value.localeCompare(inputs.Password2.value)){
                setFormData({id: 'Password1', value: 'Passwords must match', validity: false, target: inputs.Password1});
                setFormData({id: 'Password2', value: 'Passwords must match', validity: false, target: inputs.Password2});
                isFormValid = false;
            }
        }

        if(isFormValid){
            props.handleFromSubmit(formData, setFormData);
        }        
    }

    const resetForm = (e) =>{
        e.preventDefault();
        for(const target of formRef.current.getElementsByTagName('INPUT')){
            setFormData({id: target.id, value: '', validity: true, target: target});
        }
    }

    const validateInput = (target) =>{
        const {id, dataset, value} = target;
        const result = CheckInputValidity({value: value, type: dataset.type});
        setFormData({id: id, value: result.value, validity: result.validity,  target: target});
        return result.validity;
    }
    return (
        <form onSubmit={handleFromSubmit} ref={formRef}>
            {props.formInputs && props.formInputs.map((input, index) => (
                <div className="formRow" key={`input-${index}-${input.type}`}>
                    <label htmlFor={input.id}>{input.label}</label>
                    <input
                        id={input.id}
                        data-type={input.type}
                        value={formData[input.id] && formData[input.id].validity? formData[input.id].value : ''}
                        onChange={handleInputChange}
                    />
                {formData[input.id] && !formData[input.id].validity && <span className='invalidMsg'>{formData[input.id].value}</span>}
                </div>
            ))}
            <div>
                <button className='formBtn' onClick={resetForm}>Clear</button>
                <button className='formBtn' type='submit'>Submit</button>
            </div>
            
        </form>
    )
}