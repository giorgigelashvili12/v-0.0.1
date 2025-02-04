import fetchClient from '../utils/fetchClient.js';

const FetchClient = new fetchClient();

const fetchAdapter = {
    get(url, config={}) {
        return FetchClient.get(url, config);
    },
    post(url, data, config = {}) {
        return fetchClient.post(url, data, config);
    },
    put(url, data, config = {}) {
        return fetchClient.put(url, data, config);
    },
    delete(url, config = {}) {
        return fetchClient.delete(url, config);
    },
    patch(url, data, config = {}) {
        return fetchClient.patch(url, data, config);
    }
}

export default fetchAdapter;