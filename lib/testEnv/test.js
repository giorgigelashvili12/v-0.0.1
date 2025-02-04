// utils.test.js
import {
  isArray,
  isUndefined,
  isBuffer,
  isFormData,
  isDate,
  flatten,
  deepClone,
  mergeDeep,
  isPlainObj,
  isObject,
  isFile,
  isBlob,
  isFunction,
  isString,
  endsWith,
  isFileList,
  toFlatObj,
  hasOwnProp
} from '../utils.js';

describe('Utility Functions', () => {
  test('isArray should return true for arrays', () => {
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray([])).toBe(true);
    expect(isArray('string')).toBe(false);
  });

  test('isUndefined should return true for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
  });

  test('isBuffer should return true for Buffer objects', () => {
    const buf = Buffer.from('test');
    expect(isBuffer(buf)).toBe(true);
    expect(isBuffer('string')).toBe(false);
  });

  test('isFormData should return true for FormData objects', () => {
    const formData = new (require('form-data'))();
    expect(isFormData(formData)).toBe(true);
    expect(isFormData('string')).toBe(false);
  });

  test('isDate should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate('2025-02-02')).toBe(false);
  });

  test('flatten should flatten an array', () => {
    expect(flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('deepClone should create a deep copy of objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copy = deepClone(obj);
    expect(copy).not.toBe(obj);  // They should not be the same reference
    expect(copy.b).not.toBe(obj.b);  // Deep copy, so inner objects should also be cloned
  });

  test('mergeDeep should merge objects deeply', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: 1, c: 2 } });
  });

  test('isPlainObj should return true for plain objects', () => {
    expect(isPlainObj({})).toBe(true);
    expect(isPlainObj([])).toBe(false);
    expect(isPlainObj(null)).toBe(false);
  });

  test('isObject should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);  // Arrays are objects in JavaScript
    expect(isObject(null)).toBe(false);
  });

  test('isFile should return true for File objects', () => {
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    expect(isFile(file)).toBe(true);
    expect(isFile('string')).toBe(false);
  });

  test('isBlob should return true for Blob objects', () => {
    const blob = new Blob(['content'], { type: 'text/plain' });
    expect(isBlob(blob)).toBe(true);
    expect(isBlob('string')).toBe(false);
  });

  test('isFunction should return true for functions', () => {
    const func = () => {};
    expect(isFunction(func)).toBe(true);
    expect(isFunction('string')).toBe(false);
  });

  test('isString should return true for strings', () => {
    expect(isString('string')).toBe(true);
    expect(isString(123)).toBe(false);
  });

  test('endsWith should return true if string ends with the specified suffix', () => {
    expect(endsWith('hello world', 'world')).toBe(true);
    expect(endsWith('hello world', 'hello')).toBe(false);
  });

  test('isFileList should return true for FileList objects', () => {
    if (typeof FileList !== 'undefined') {
      const fileList = new DataTransfer().files;
      expect(isFileList(fileList)).toBe(true);
    } else {
      const fileList = { length: 2, item: () => ({ name: 'file.txt' }) };
      expect(isFileList(fileList)).toBe(false);
    }
    expect(isFileList('string')).toBe(false);
  });

  test('toFlatObj should flatten an object', () => {
    const nestedObj = { a: { b: { c: 1 } } };
    const flatObj = toFlatObj(nestedObj);
    expect(flatObj).toEqual({ 'a.b.c': 1 });
  });

  test('hasOwnProp should check if object has property', () => {
    const obj = { a: 1 };
    expect(hasOwnProp(obj, 'a')).toBe(true);
    expect(hasOwnProp(obj, 'b')).toBe(false);
  });
});
