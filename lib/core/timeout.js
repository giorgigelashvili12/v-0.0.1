'use strict';

/**
 * abort a requestafter a specified timeout duration
 * @param {Function} reqFn the function to execute the req
 * @param {Object} config the request config
 * @param {Number} timeout the timeout duration in ms
 * @returns {Promise} a promise that resolves with the res or reject
 */
function timeoutReq(reqFn, config, timeout=5000) {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const signal = controller.signal;
        config.signal = signal;

        const timer = setTimeout(() => {
            controller.abort();
            reject(new Error('Request Timed Out.'))
        }, timeout);

        reqFn(config)
            .then(res => {
                clearTimeout(timer);
                resolve(res);
            })
            .catch(e => {
                clearTimeout(timer);
                reject(e);
            });
    });
}

export default timeoutReq;