'use strict';

/**
 * automatically parse JSON res
 * @param {Response} res response object
 * @returns {Promise} a promise that resolves with the parsed JSON data
 */
function parseJSONRes(res) {
    const contentType = res.headers.get('content-type');
    if(contentType && contentType.includes('application/json')) {
        return res.json().then(data => ({data}));
    }
    return res.text().then(data => ({data}));
}

export default parseJSONRes;