import MockFetch from './mock-fetch';

const post = async(url, data) =>{
    return MockFetch(url, data);
}


export default {
    post: async(url, data ) => post(url, data),
}


