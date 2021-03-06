import ApiService from '../../services/api';
import {ValidateInputs} from '../../services/inputValidation';
import History from '../../routing/history';

const handleFormSubmit = (formData, setDataForm) => {
    if(ValidateInputs(formData, setDataForm)){
        const data = {};
        Object.keys(formData).forEach(k => {data[k] = formData[k].value;});
        ApiService.post('newaccount', data)
        .then(response =>{
            if(response.ok)
                History.push('/');
            else
                throw new Error(`ERROR: ${response.status} - ${response.statusText}`);
        })
        .catch(e => History.push({pathname:'error', state:{errorMsg: e.message}}));
    }
}

export default {
    handleFormSubmit: (dataForm, setDataForm) => handleFormSubmit(dataForm, setDataForm)
}