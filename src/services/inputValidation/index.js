const isEmptyWhiteSpace = (input) => !input || input.length === 0 || /^\s+$/.test(input);
const isCurrency = (input) => input && /^[0-9\.\$]+$/.test(input);
const isInt = (input) => input && /^[0-9]+$/.test(input);
const isEmail = (input) => input && /\S+@\S+\.\S+/.test(input);
const isValidPsw = (input) => input && /[0-9!@#\$%\^\&*]/.test(input);
const parseCurrencyInput = (input) => {
    if(!isCurrency(input)) return NaN;
    input.replaceAll('$', '');
    return parseFloat(input).toFixed(2);
}
const parseIntInput = (input) => isInt(input)? parseInt(input) : NaN;

const CheckInputValidity = (input) => {
    if(isEmptyWhiteSpace(input.value)){
        return {validity: false, value: 'please enter a value'}; 
    }
    let value = '';
    switch(input.type.toLowerCase()){
        case 'currency':
            value = parseCurrencyInput(input.value)
            if(isNaN(value)){
                return {validity: false, value: 'please enter a currency value'};
            }else{
                return {validity: true, value: value};
            }
        case 'creditscore':
            value = parseIntInput(input.value)
            if(isNaN(value)){
                return {validity: false, value: 'please enter a credit score value'};
            }else{
                if(value >= 300 && value <= 850){
                    return {validity: true, value: value};
                }else{
                    return {validity: false, value: 'credit score is outside of the valid range(300-850)'};
                }
            }
        case 'email':
            if(isEmail(input.value)){
                return {validity: true, value: input.value};
            }else{
                return {validity: false, value: 'please enter a valid email address'};
            }
        case 'password':
            if(!isValidPsw(input.value)){
                return {validity: false, value: 'a password must a number or special character'};
            }else if(input.value.length < 8){
                return {validity: false, value: 'a password must have more than 8 characters'};
            }
            return {validity: true, value: input.value};
        case 'text':
            return {validity: true, value: input.value};
    }
    return {validity: false, value: ''};
}

export function ValidateInputs(formData, setFormData){
    let isFormValid = true;
    for(const key of Object.keys(formData)){
        const {type, value} = formData[key];
        const result = CheckInputValidity({value: value, type:type});
        setFormData({action:'upsert', id: key, value: result.value, validity: result.validity,  type: type});
        isFormValid = result.validity? isFormValid : false;
    }
    if(formData.Password1 && formData.Password2){
        if(formData.Password1.value.localeCompare(formData.Password2.value)){
            setFormData({id: 'Password2', value: 'Passwords must match', validity: false, type: formData.Password2.type});
            setFormData({id: 'Password1', value: 'Passwords must match', validity: false, type: formData.Password1.type});
            isFormValid = false;
        }
    }
    return isFormValid;
}