import httpClient from "../utils/httpClient.js";

const httpClient = new httpClient();

const xhrAdapter = {
    get(url, config ={}) {
        return httpClient.get(url, config);
    },

    post(url, data, config = {}) {
        return httpClient.post(url, data, config);
    },

    put(url, data, config={}) {
        return httpClient.put(url, data, config);
    },

    delete(url, config = {}) {
        return httpClient.delete(url, config);
    },

    patch(url, data, config = {}) {
        return httpClient.patch(url, data, config);
    }
}

export default xhrAdapter;