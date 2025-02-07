'use strict';

/**
 * validates and normalizes req headers
 * @param {Object} headers the req headers
 * @returns {Object} validated & normalized headers
 */
function validateHeaders(headers) {
    const normalizedHeaders = {};
    Object.keys(headers).forEach(k => {
        const normalized = k.toLowerCase();
        normalizedHeaders[normalized] = headers[k];
    });
}

export default validateHeaders;