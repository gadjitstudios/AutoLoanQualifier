import React, { useReducer, useRef } from 'react';
import { InputValidation } from '../../services/inputValidation';
import './index.scss';

const formReducer = (state, input) =>{
    if(input.target){
        input.target.setCustomValidity(input.msg);
    }
    return{
        ...state,
        [input.id]: {value: input.value, msg: input.msg}
    }
}


export default function AppInputOnlyForm(props) {
    const formRef = useRef();
    const [formData, setFormData] = useReducer(formReducer, {});
    const handleInputChange = ({target}) => setFormData({id: target.id, value: target.value, msg:'', target: target});
    const handleInputBlur = ({target}) => validateInput(target);

    const handleFromSubmit = (e) => {
        e.preventDefault();
        let isFormValid = true;
        for(const input of formRef.current){
            isFormValid = validateInput(input)? isFormValid : false;
        }
        if(isFormValid) return;

        props.handleFromSubmit(formData);
    }

    const resetForm = (e) =>{
        e.preventDefault();
        for(const input of formRef.current){
            if(input.tagName != 'INPUT') return;
            setFormData({id: input.id, value: '', msg: '', target: input});
        }
    }

    const validateInput = (target) =>{
        if(target.tagName != 'INPUT') return;

        const {dataset, value} = target;
        let validation = {validity: true, value: value, message:''};
        switch(dataset.type.toLowerCase()){
            case 'currency':
                validation = InputValidation.validateCurrency(value);
            break;
            case 'creditscore':
                validation = InputValidation.validateCreditScore(value);
            break;
            case 'text':
                validation = InputValidation.validateText(value);
            break;
            
        }
        setFormData({id: target.id, value: validation.value, msg: validation.message, target: target});
        return validation.validity;
    }
    return (
        <form onSubmit={handleFromSubmit} ref={formRef}>
            {props.formInputs && props.formInputs.map((input, index) => (
                <React.Fragment key={`input-${index}-${input.type}`}>
                    <label htmlFor={input.id}>{input.label}</label>
                    <input
                        id={input.id}
                        data-type={input.type}
                        value={formData[input.id]? formData[input.id].value : ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={formData[input.id]? formData[input.id].msg : ''}
                    />
                </React.Fragment>
            ))}
            <button className='formBtn' onClick={resetForm}>Clear</button>
            <button className='formBtn' type='submit'>Submit</button>
        </form>
    )
}