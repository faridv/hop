// import {describe, expect, it} from 'jasmine';
// import * as jasmine from 'jasmine';
import Store from './storage.utility';

describe('Storage Utility', () => {
    it ('should be able to check where local storage is available or not', () => {
        expect(Store.is_localstorage).toBeDefined();
    })
});