"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = void 0;
function getDateString(date, shortYear = false) {
    const current = new Date(date);
    const format = (num) => ("0" + num).slice(-2);
    return `${format(current.getDate())}/${format(current.getMonth() + 1)}/${current.getFullYear() - (shortYear ? 2000 : 0)}`;
}
exports.getDateString = getDateString;
