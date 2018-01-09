# sprawlpie-datetime-formatter

## 简介
一个日期格式字符串转换工具类。

## 安装
yarn
```
yarn add sprawlpie-datetime-formatter
```

npm
```
npm i sprawlpie-datetime-formatter --save
```

## 示例
```
import ExtraDate from 'sprawlpie-datetime-formatter';

let exDate = new ExtraDate();

// 输出'2017/12/12 12:12:12'
exDate.getFormattedStringByMask('YYYY/MM/DD hh:mm:ss');
```

## 规范
传入掩码遵循ISO 8601规范，一下是目前支持的掩码格式（不断完善中）
 * YYYY = four-digit year
 * MM   = two-digit month (01=January, etc.)
 * DD   = two-digit day of month (01 through 31)
 * hh   = two digits of hour (00 through 23) (am/pm NOT allowed)
 * mm   = two digits of minute (00 through 59)
 * ss   = two digits of second (00 through 59)
