'use strict';

/**
 * track upload and download
 * @param {Function} reqFn function for req
 * @param {Object} config req config
 * @param {Function} onProgress fn to handle progress events
 * @returns {Promise}
 */
function trackProgress(reqFn, config, onProgress) {
    const xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url, true);

    xhr.upload.onprogress = onProgress;
    xhr.onprogress = onProgress;

    xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        resolve({data: res});
    };

    xhr.onerror = () => {
        reject(new Error('Network Error'));
    };

    xhr.send(config.data);
}

export default trackProgress;