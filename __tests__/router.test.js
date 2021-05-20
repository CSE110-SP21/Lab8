/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe('pushToHistory function', () => {
    test('pushes settings page', () => {
        let hist = pushToHistory('settings');
        expect(hist.state?.page).toEqual('settings');
    });

    test('pushes entry page', () => {
        let hist = pushToHistory('entry', 3);
        expect(hist.state?.page).toEqual('entry3');
    });
    
    test('pushes default page', () => {
        let hist = pushToHistory('');
        expect(hist.state).toEqual({});
    });
    
    test('adds to history stack', () => {
        let exp = history.length;
        let hist = pushToHistory('');
        expect(hist.length).toEqual(exp+1);
    });
});