"use strict";

import ExtraDate, {MASKS} from '../ExtraDate';

let exDate = new ExtraDate(2017, 1, 1, 1, 1, 1);

test('Test format YYYY-MM-DD', () => {
    expect(exDate.getISODateString()).toBe('2017-02-01');
});

test('Test format hh:mm:ss', () => {
    expect(exDate.getISOTimeString()).toBe('01:01:01');
});

test('Test format YYYY-MM-DD hh:mm:ss', () => {
    expect(exDate.getISODatetimeString()).toBe('2017-02-01 01:01:01');
});

test('Test format YYYY/MM/DD hh:mm:ss', () => {
    expect(exDate.getFormattedStringByMask('YYYY/MM/DD hh:mm:ss')).toBe('2017/02/01 01:01:01');
});