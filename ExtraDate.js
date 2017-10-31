
export const MASKS = {
    ISO_DATE: "YYYY-MM-DD",
    ISO_TIME: "hh:mm:ss",
    ISO_DATETIME: 'YYYY-MM-DD hh:mm:ss',
    ISO_FULL_DATETIME: 'YYYY-MM-DDThh:mm:ss.sssZ'
};

/**
 * ISO 8601 格式说明
 * https://www.w3.org/TR/NOTE-datetime
 *
 * YYYY = four-digit year
 * MM   = two-digit month (01=January, etc.)
 * DD   = two-digit day of month (01 through 31)
 * hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
 * mm   = two digits of minute (00 through 59)
 * ss   = two digits of second (00 through 59)
 * s    = one or more digits representing a decimal fraction of a second
 * TZD  = time zone designator (Z or +hh:mm or -hh:mm)
 *
 */
export default class ExtraDate {

    get nativeDate() {
        return this._nativeDate;
    }

    /**
     * 接受多种方式构造：
     * Date对象
     * 或者
     * Date.parse函数入参
     * @param args
     */
    constructor(...args) {
        if (args.length) {
            let firstArgument = args[0];

            if (firstArgument instanceof Date) {
                this._nativeDate = firstArgument;
            } else {
                this._nativeDate = new Date(...args);
            }
        } else {
            this._nativeDate = new Date();
        }
    }

    /**
     * 返回YYYY-MM-DD hh:mm:ss格式字符串
     * @param isUTCTime
     * @returns {*}
     */
    getISODatetimeString(isUTCTime = false) {
        return this.getFormattedStringByMask(MASKS.ISO_DATETIME, isUTCTime);
    }

    getISODateString(isUTCTime = false) {
        return this.getFormattedStringByMask(MASKS.ISO_DATE, isUTCTime);
    }

    getISOTimeString(isUTCTime = false) {
        return this.getFormattedStringByMask(MASKS.ISO_TIME, isUTCTime);
    }

    /**
     * 按照要求格式返回
     * @param stringMask
     * @param isUTCTime
     * @returns {string}
     */
    getFormattedStringByMask(stringMask = MASKS.ISO_DATETIME, isUTCTime = false) {
        let date = this._nativeDate;

        if (stringMask === MASKS.ISO_FULL_DATETIME) {
            return date.toISOString();
        }

        let token = /D{1,4}|M{1,4}|YY(?:YY)?|([hmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;

        let D = isUTCTime ? date.getUTCDate() : date.getDate(),
            // d = isUTCTime ? date.getUTCDay() : date.getDay(),
            M = isUTCTime ? date.getUTCMonth() : date.getMonth(),
            Y = isUTCTime ? date.getUTCFullYear() : date.getFullYear(),
            h = isUTCTime ? date.getUTCHours() : date.getHours(),
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
            ['hh', ExtraDate.pad(h)],
            ['mm', ExtraDate.pad(m)],
            ['ss', ExtraDate.pad(s)]
        ]);

        return stringMask.replace(token, function ($0) {
            return flags.has($0) ? flags.get($0) : $0.slice(1, $0.length - 1);
        });
    }

    toString() {
        return this._nativeDate;
    }

    static pad(input, expectLength = 2) {
        let strInput = typeof input === 'string' ? input : input.toString();

        while (strInput.length < expectLength) {
            strInput = '0' + strInput;
        }

        return strInput;
    };
}