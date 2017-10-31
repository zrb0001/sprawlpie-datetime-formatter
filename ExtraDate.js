
export const MASKS = {
    ISO_DATE: "YYYY-MM-DD",
    ISO_TIME: "HH:mm:ss",
    ISO_DATETIME: 'YYYY-MM-DD HH:mm:ss',
    ISO_FULL_DATETIME: 'YYYY-MM-DDTHH:mm:ss.sssZ'
};

export default class ExtraDate {

    get nativeDate() {
        return this._nativeDate;
    }

    constructor(...args) {
        this._nativeDate = new Date(...args);
    }

    getISODatetimeString(isUTCTime = false) {
        return this.getFormattedStringByMask(MASKS.ISO_DATETIME, isUTCTime);
    }

    getFormattedStringByMask(stringMask = MASKS.ISO_DATETIME, isUTCTime = false) {
        let date = this._nativeDate;

        if (stringMask === MASKS.ISO_FULL_DATETIME) {
            return date.toISOString();
        }

        let token = /D{1,4}|M{1,4}|YY(?:YY)?|([HmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;

        let D = isUTCTime ? date.getUTCDate() : date.getDate(),
            // d = isUTCTime ? date.getUTCDay() : date.getDay(),
            M = isUTCTime ? date.getUTCMonth() : date.getMonth(),
            Y = isUTCTime ? date.getUTCFullYear() : date.getFullYear(),
            H = isUTCTime ? date.getUTCHours() : date.getHours(),
            m = isUTCTime ? date.getUTCMinutes() : date.getMinutes(),
            s = isUTCTime ? date.getUTCSeconds() : date.getSeconds();
            // L = isUTCTime ? date.getUTCMinutes() : date.getMilliseconds(),
            // o = isUTCTime ? 0 : date.getTimezoneOffset();

        let flags = new Map([
            ['D', D],
            ['DD', ExtraDate.pad(D)],
            ['M', M + 1],
            ['MM', ExtraDate.pad(M + 1)],
            ['YY', Y.toString().slice(2)],
            ['YYYY', Y],
            ['H', H % 12 || 12],
            ['HH', ExtraDate.pad(H)],
            ['mm', ExtraDate.pad(m)],
            ['ss', ExtraDate.pad(s)]
        ]);

        return stringMask.replace(token, function ($0) {
            return flags.has($0) ? flags.get($0) : $0.slice(1, $0.length - 1);
        });
    }

    static pad(input, expectLength = 2) {
        let strInput = typeof input === 'string' ? input : input.toString();

        while (strInput.length < expectLength) {
            strInput = '0' + strInput;
        }

        return strInput;
    };
}