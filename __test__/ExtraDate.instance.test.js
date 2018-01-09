"use strict";

import ExtraDate, {MASKS} from '../dist/ExtraDate';

test('Test pass now', () => {
    let ts = Date.now();
    let exDate = new ExtraDate(ts);
    let nativeDate = exDate.nativeDate;

    expect(nativeDate.valueOf()).toBe(ts);
});

test('Test pass Date instance', () => {
    let newDate = new Date();
    let exDate = new ExtraDate(newDate);

    expect(exDate.nativeDate).toBe(newDate);
});