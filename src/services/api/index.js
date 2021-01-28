
const handleError = (status, msg='') =>{
    switch(status){
        case 401:
            break;
        case 404:
            break;
        case 500:
            break;
        default:
            console.log(msg);
    }
}

const getUnhandled = async(url, signal) =>{
    return fetch(url,{
        signal: signal,
        method: 'GET',
    });
}

const get = async(url, signal) =>{
    return getUnhandled(url, signal)
    .then(response =>{
        if(response.status < 400)
            return response.json();
        else
            handleError(response.status);
    });
}

const postUnhandled = async(url, signal, data) =>{
    return fetch(url,{
        signal: signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const post = async(url, signal, data ) =>{
    return postUnhandled(url, signal, data)
    .then(response =>{
        if(response.status < 400)
            return response.json();
        else
            handleError(response.status);
    });
}


export default {
    get: async(url, signal) => get(url, signal),
    getUnhandled: async(url, signal) => getUnhandled(url, signal),
    post: async(url, signal, data ) => post(url, signal, data),
    postUnhandled: async(url, signal, data ) => postUnhandled(url, signal, data),
}


