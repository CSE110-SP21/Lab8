/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { pushToHistory } from "../scripts/router";

describe('Test history', () => {

    test('Settings', () => {

        pushToHistory('settings', 5);
        expect(history.state.page).toBe('settings');
    });

    test('Entry', () => {

        pushToHistory('entry', 5);
        expect(history.state.page).toBe('entry5');
        
        pushToHistory('entry', 10);
        expect(history.state.page).toBe('entry10');

        pushToHistory('entry', 15);
        expect(history.state.page).toBe('entry15');
    });

    test('Deafult', () => {

        pushToHistory('dead memes', 69);
        expect(history.state.page).toBeUndefined();

        pushToHistory('stettings', 2);
        expect(history.state.page).toBeUndefined();

    });

});