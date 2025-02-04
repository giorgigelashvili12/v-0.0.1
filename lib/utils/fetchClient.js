import rawHeaders from "./rawHeaders";

class fetchClient {
    constructor() {
        this.defaultConfig = {
            headers: {},
            timeout: 0,
            responseType: 'json',
            onUploadProgress: null,
            onDownloadProgress: null,
            cancel: null,
            signal: null
        };
    }

    /**
     * merge user config with default
     * @param {Object} config - The config to merge with default
     * @returns {Object} - The merged config
     */

    merge(c) {
        return {...this.defaultConfig, ...c};
    }

    /**
     * Send a request (Make HTTP req with fetch api)
     * @param {string} method - The method to use
     * @param {string} url - The url to send the request to
     * @param {Object} data - The data to send
     * @param {Object} [config={}] - The config to use
     * @returns {Promise<Object>} - The request promise
     */

    async req(method, url, data=null, config={}) {
        const _config = this.merge(config);
        const controller = new AbortController(); 
        const signal = _config.signal || controller.signal; 

        const fetchConfig = {
            method: method.toUpperCase(),
            headers: _config.headers,
            body: data,
            signal,
            body: data ? JSON.stringify(data) : null
        }

        if(_config.timeout) {
            setTimeout(() => controller.abort(), _config.timeout);
        }

        try {
            const res = await fetch(url, fetchConfig);
            const headers = rawHeaders(res.headers);
            const body = _config.responseType === 'json' ? await res.json() : await res.text();
            
            if(!res.ok) {
                throw new Error('Request failed with status code ' + res.status);
            }

            return {
                data: body,
                status: res.status,
                statusText: res.statusText,
                headers: headers,
                config: _config,
                req: res
            };
        } catch(e) {
           throw new Error(e.message || 'Network Error');
        }
    }

    get(url, config={}) {
        return this.req('GET', url, null, config);
    }
    post(url, data, config={}) {
        return this.req('POST', url, data, config);
    }
    put(url, data, config={}) {
        return this.req('PUT', url, data, config);
    }
    delete(url, config={}) {
        return this.req('DELETE', url, null, config);
    }
    patch(url, data, config={}) {
        return this.req('PATCH', url, data, config);
    }
}

const fetchAdapter = new fetchClient();
export default fetchAdapter;
