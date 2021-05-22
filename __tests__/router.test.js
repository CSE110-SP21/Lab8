/**
 * @jest-environment jsdom
 */
import { TestScheduler } from '@jest/core';
import {pushToHistory} from '../scripts/router.js';
describe('pushToHistory test', () => {
    test('settings case', () => {
        let history = pushToHistory('settings');
        expect(history.state.page).toBe('settings');
        expect(history.length).toBe(2);
    });
    test('entry case', () => {
        let history = pushToHistory('entry', 1);
        expect(history.state.page).toBe('entry1');
        expect(history.length).toBe(3);
    });
    test('default case', () => {
        let history = pushToHistory();
        expect(history.state.page).toBeUndefined();
        expect(history.length).toBe(4);
    })
})
