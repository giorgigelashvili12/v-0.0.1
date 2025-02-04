/**
 * Convert an array of strings to an object  
 * @param {string[]} array - The array to convert
 * @returns {Object} - The object created from the array
*/

const toObj = (arr) => { 
    const set = {};
    arr.forEach((item) => {
        set[item] = true;
    });
    return set;
};

export default toObj;