const validateCurrency = (input) =>{
    if(!input){
        return {validity: false, value: '', message:'please enter a currency value'};
    }
    if(!/^[0-9\.\$]+$/.test(input)){
        return {validity: false, value: '', message:'invalid currency value'};
    }
    input.replaceAll('$', '');
    return {validity: true, value:parseFloat(input).toFixed(2), message:'' };
}

const validateCreditScore = (input) =>{
    if(!input){
        return {validity: false, value: '', message:'please enter a credit score'};
    }
    if(!/^[0-9]+$/.test(input)){
        return {validity: false, value: '', message:'invalid credit score value'};
    }
    const score = parseInt(input);
    if(score >= 300 && score <= 850){
        return {validity: true, value: score, message:''};
    }
    return {validity: false, value: '', message:'credit score is outside of the valid range(300-850)'};
}

const validateText = (input) =>{
    if(!input){
        return {validity: false, value: '', message:'please enter a value'};
    }
    return {validity: true, value: input, message:''};
}

export const InputValidation ={
    validateCurrency: (input) => validateCurrency(input),
    validateCreditScore: (input) => validateCreditScore(input),
    validateText: (input) => validateText(input)
}