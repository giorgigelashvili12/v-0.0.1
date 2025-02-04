import httpClient from "../utils/httpClient";

const HttpClient = new httpClient();

const httpAdapter = {
    get(url, config={}) {
        return HttpClient.get(url, config);
    },
    post(url, data, config={}) {
        return HttpClient.post(url, data, config);
    },
    put(url, data, config={}) {
        return HttpClient.put(url, data, config);
    },
    delete(url, config={}) {
        return HttpClient.delete(url, config);
    },
    patch(url, data, config={}) {
        return HttpClient.patch(url, data, config);
    }
};

export default httpAdapter;