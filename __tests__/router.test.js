/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import { pushToHistory } from "../scripts/router.js";

describe('pushToHistoryTest', () => {

        test('initially state is null and history length is 1', () => {
            expect(history.state).toBe(null);
            expect(history.length).toBe(1);
        });
        test('default value: pushToHistory('',0), state.page=undefined , length=2, location.hash=''', () => {
            pushToHistory('',0);
            expect(history.state.page).toBe(undefined);
            expect(history.length).toBe(2);
            expect(window.location.hash)toBe('');
        });
        test('settings input: pushToHistory("settings",0), state.page=settings , length=3, location.hash="#settings"', () => {
            pushToHistory('settings',0);
            expect(history.state.page).toBe('settings');
            expect(history.length).toBe(3);
            expect(window.location.hash)toBe('#settings');
        });
        test('entry input: pushToHistory("entry",2), state.page="entry2" , length=4, location.hash="#entry2"', () => {
            pushToHistory('entry',2);
            expect(history.state.page).toBe('entry2');
            expect(history.length).toBe(4);
            expect(window.location.hash)toBe('#entry2');
        });

});
