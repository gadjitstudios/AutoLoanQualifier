import ApiService from '../../services/api';
import {ValidateInputs} from '../../services/inputValidation';
import History from '../../routing/history';

const handleFormSubmit = (formData, setDataForm) => {
    if(ValidateInputs(formData, setDataForm)){
        const data = {};
        Object.keys(formData).forEach(k => {data[k] = formData[k].value;});
        ApiService.post('autoloan', data)
        .then(response =>{
            if(response.ok)
                return response.json();
            else
                throw new Error(`ERROR: ${response.status} - ${response.statusText}`);
        })
        .then(data => {
            if(data){
                if(data.hasQualified){
                    History.push('new_account');
                }else{
                    History.push({pathname:'disqualification', state:{message: data.msg}});
                }
            }
            
        })
        .catch(e => History.push({pathname:'error', state:{errorMsg: e.message}}));
    }
}

export default {
    handleFormSubmit: (dataForm, setDataForm) => handleFormSubmit(dataForm, setDataForm)
}