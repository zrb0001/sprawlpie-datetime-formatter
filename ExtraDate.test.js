"use strict";

import ExtraDate, {MASKS} from './ExtraDate';

test('Test now', () => {
    let ts = Date.now();
    let exDate = new ExtraDate(ts);

    let nativeDate = exDate.nativeDate;

    expect(nativeDate.valueOf()).toBe(ts);

});

test('Test ISO format', () => {
    let exDate = new ExtraDate(2017, 1, 1, 1, 1, 1);

    expect(exDate.getFormattedStringByMask('YYYY/MM/DD HH:mm:ss')).toBe('2017/02/01 01:01:01');
});