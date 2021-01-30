const isEmptyWhiteSpace = (input) => !input || input.length === 0 || /^\s+$/.test(input);
const isFloat = (input) => input && /^[0-9\.]+$/.test(input);
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

export default function CheckInputValidity(input){
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